import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { generateBatchSummarySystemPrompt } from "./prompt.js";
import { checkAndIncrementRateLimit } from "./redis/atomic-operation.js";
import { getGeminiRequestsThisMinuteRedisKey } from "./redis/redis-keys.js";

dotenv.config();

const REQUEST_LIMIT = 12;

type Summary = {
  path: string;
  summary: string;
};

type ParsedSummary = {
  id: string;
  path: string;
  summary: string;
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const model = "gemini-2.0-flash";

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function handleAtomicRateLimit() {
  const geminiRequestsCountKey = getGeminiRequestsThisMinuteRedisKey();

  const result = await checkAndIncrementRateLimit(
    geminiRequestsCountKey,
    REQUEST_LIMIT
  );

  console.log("--------------------------------------");
  console.log("Rate limit check result:", {
    allowed: result.allowed,
    currentRequests: result.currentRequests,
  });
  console.log("--------------------------------------");

  if (!result.allowed) {
    console.log("Rate limit exceeded, waiting...");
    await sleep(1);
    return false;
  }

  return true;
}

/**
 * Wait for rate limits to reset and retry the atomic check
 */
async function waitForRateLimitReset(maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    const allowed = await handleAtomicRateLimit();
    if (allowed) {
      return; // Successfully acquired rate limit slot
    }

    // Wait before retrying
    await sleep(1);
  }
}

async function sleep(times: number) {
  console.log(`Sleeping for ${2 * times} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, 2000 * times));
}

export async function generateBatchSummaries(
  files: { id: string; path: string; content: string | null }[]
) {
  let rawResponse;
  for (let i = 0; i < 100; i++) {
    try {
      const filePaths = new Set(files.map((file) => file.path));

      const prompt = `
      Files:
      ${files
        .map(
          (file, index) =>
            `${index + 1}. path: ${
              file.path
            }\n   content: ${file.content?.substring(0, 500)}...`
        )
        .join("\n")}
      `;

      // Atomic rate limiting - will wait until allowed
      await waitForRateLimitReset();

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.1,
          systemInstruction: generateBatchSummarySystemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                path: { type: Type.STRING },
                summary: { type: Type.STRING },
              },
              required: ["path", "summary"],
              propertyOrdering: ["path", "summary"],
            },
          },
        },
      });

      if (!response || !response.text) {
        throw new Error("Invalid batch summary response format");
      }

      const result = JSON.parse(response.text);

      console.log("result in generateBatchSummaries is ", result);

      if (!isValidBatchSummaryResponse(result, filePaths)) {
        throw new Error("Invalid batch summary response format");
      }

      const summaries: Summary[] = result;
      const parsedSummaries: ParsedSummary[] = summaries.map((summary) => {
        const file = files.find((f) => f.path === summary.path);
        if (!file) {
          throw new Error(
            `File path not found in the provided files array: ${summary.path}`
          );
        }

        return {
          id: file.id,
          path: summary.path,
          summary: summary.summary,
        };
      });

      return parsedSummaries;
    } catch (error) {
      if (error instanceof Error) {
        console.log("--------------------------------");
        console.log("rawResponse is ", rawResponse);
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
        console.log("--------------------------------");
      }

      if (
        error instanceof Error &&
        error.message.includes("GoogleGenerativeAI Error")
      ) {
        console.log("--------------------------------");
        console.log(
          `GoogleGenerativeAI Error occurred. Trying again for ${i} time`
        );
        console.log("--------------------------------");
        sleep(i + 1);
        continue;
      }

      if (
        error instanceof Error &&
        error.message.includes("429 Too Many Requests")
      ) {
        console.log(`Trying again for ${i + 1} time --generateBatchSummaries`);
        sleep(i + 1);
        continue;
      }

      if (
        error instanceof Error &&
        (error.message.includes("Invalid batch summary response format") ||
          error.stack?.includes("SyntaxError"))
      ) {
        console.log("--------------------------------");
        console.log(`Syntax Error occurred. Trying again for ${i} time`);
        console.log("--------------------------------");
        sleep(i + 1);
        continue;
      }

      if (error instanceof Error) {
        console.log("--------------------------------");
        console.log(`Unknown Error Occurred. Trying again for ${i} time`);
        console.log("--------------------------------");
        sleep(i + 1);
        continue;
      }

      throw new Error(
        error instanceof Error
          ? error.message
          : "Unexpected error occurred while generating batch summary."
      );
    }
  }
  throw new Error("Unexpected error occurred while generating batch summary.");
}

function isValidBatchSummaryResponse(data: any, filePaths: Set<string>) {
  if (!Array.isArray(data)) {
    return false;
  }
  // Validate each item in the array
  for (const item of data) {
    // Ensure item is an object of type Summary and valid path and not null
    if (
      typeof item !== "object" ||
      item === null ||
      typeof item.path !== "string" ||
      typeof item.summary !== "string" ||
      !filePaths.has(item.path) ||
      Object.keys(item).length !== 2
    ) {
      return false;
    }
  }

  return true;
}
