"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProcessStatus } from "@prisma/client";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type ProcessStep = {
  status: ProcessStatus;
  label: string;
};

const processSteps: ProcessStep[] = [
  { status: "PENDING", label: "Initializing" },
  { status: "GENERATING_TRANSCRIPT", label: "Generating Transcript" },
  { status: "SEMANTIC_CHUNKING", label: "Semantic Chunking" },
  { status: "ANALYZING", label: "Analyzing" },
  { status: "COMPLETED", label: "Completed" },
];

const TERMINAL_STATUSES: ProcessStatus[] = ["COMPLETED", "FAILED", "CANCELLED"];

export default function Home() {
  const [processId, setProcessId] = useState<string | null>(null);
  const [processStatus, setProcessStatus] = useState<ProcessStatus | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isStartingProcess, setIsStartingProcess] = useState(false);
  const { toast } = useToast();

  // Handle status changes with a single useEffect
  useEffect(() => {
    if (!processStatus) return;

    switch (processStatus) {
      case "COMPLETED":
        toast({
          title: "Success",
          description: "Process completed successfully!",
        });
        break;
      case "FAILED":
        toast({
          variant: "destructive",
          title: "Process Failed",
          description:
            "The process encountered an error and couldn't complete.",
        });
        break;
    }
  }, [processStatus, toast]);

  // Handle errors with a single useEffect
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  // Listen to Process Status using SSE
  useEffect(() => {
    if (!processId) return;

    const eventSource = new EventSource(`/api/process/${processId}/stream`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("data --onmessage is ", data);

      if (data.error) {
        setError(data.error);
        eventSource.close();
        return;
      }

      setProcessStatus(data.status);

      // If we receive a terminal status, close the connection gracefully
      if (TERMINAL_STATUSES.includes(data.status)) {
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      // Check if we have a terminal status - if so, this is an expected closure
      if (processStatus && TERMINAL_STATUSES.includes(processStatus)) {
        eventSource.close();
        return;
      }
      setError("Connection lost. Please refresh the page to retry.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [processId, processStatus]);

  // Send Request to start the process in background and receive process Id as response
  const startProcess = async () => {
    try {
      setIsStartingProcess(true);
      const response = await fetch("/api/process", { method: "POST" });
      const data = await response.json();

      console.log("data --startProcess is ", data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      setProcessId(data.processId);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to start process");
      }
    } finally {
      setIsStartingProcess(false);
    }
  };

  const getStep = (step: ProcessStep) => {
    const stepStatus = step.status;
    const stepLabel = step.label;
    const currentIndex = processStatus
      ? processSteps.findIndex((s) => s.status === processStatus)
      : -1;
    const stepIndex = processSteps.findIndex((s) => s.status === stepStatus);
    const lastIndex = processSteps.length - 1;

    // Case 1: Current stage (Blue loader + Blue text)
    if (stepIndex === currentIndex && currentIndex !== lastIndex) {
      return (
        <div className="flex gap-2">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="text-blue-500 font-medium">{stepLabel}</span>
        </div>
      );
    }

    // Case 2: Completed stages (Green tick + Green text)
    if (
      currentIndex > stepIndex ||
      (stepIndex === lastIndex && currentIndex === lastIndex)
    ) {
      return (
        <div className="flex gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <span className="text-green-500 font-medium">{stepLabel}</span>
        </div>
      );
    }

    // Case 3: Future stages (Gray circle + Gray text)
    return (
      <div className="flex gap-2">
        <Circle className="h-6 w-6 text-gray-600" />
        <span className="text-gray-500 font-medium">{stepLabel}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      {!processId && (
        <Button
          variant="outline"
          onClick={startProcess}
          disabled={isStartingProcess}
          className="cursor-pointer"
        >
          {isStartingProcess ? (
            <span className="flex gap-2">
              <Loader2 className="animate-spin" /> Starting...
            </span>
          ) : (
            <span>Get Started</span>
          )}
        </Button>
      )}

      {processId && (
        <div className="w-full max-w-md space-y-4 border bg-card/50 backdrop-blur-sm rounded-md shadow-md p-4">
          <div className="space-y-6">
            {processSteps.map((step) => (
              <div key={step.status} className="flex items-center gap-4">
                {getStep(step)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
