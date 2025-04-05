import { Queue } from "bullmq";
import { Request, Response, Router } from "express";
import redisClient from "../lib/redis";
// import { QUEUES } from "../lib/constants.js";

const router = Router();

router.get("/jobs", async (_req: Request, res: Response) => {
  if (process.env.NODE_ENV !== "development") {
    res.status(403).json({
      message: "This endpoint is only available in development mode",
    });
  }

  try {
    // Get all keys that match BullMQ job patterns
    const keys = await redisClient.keys("bull:*");

    if (keys.length === 0) {
      res.status(200).json({ message: "No jobs found to clean" });
    }

    // Delete all BullMQ related keys
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }

    // const queueNames = [
    //   QUEUES.VIDEO,
    //   QUEUES.BLOG_TITLE_AND_SUMMARY,
    //   QUEUES.BLOG_CONTENT,
    // ];

    // for (const queueName of queueNames) {
    //   const queue = new Queue(queueName, { connection: redis });
    //   await queue.obliterate({ force: true });
    //   await queue.close();
    // }

    res.json({
      message: `Successfully cleaned ${keys.length} BullMQ related keys`,
      //   queuesEmptied: queueNames,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    res.status(500).json({
      message: "Failed to clean jobs",
    });
  }
});

export default router;
