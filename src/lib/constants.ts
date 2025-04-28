export const QUEUES = {
  REPOSITORY: "repository-queue",
  DIRECTORY: "directory-queue",
  SUMMARY: "summary-queue",
  LOG: "log-queue",
};

export const FILE_BATCH_SIZE_FOR_PRISMA_TRANSACTION = 50;
export const FILE_BATCH_SIZE_FOR_AI_SUMMARY = 3;
export const CONCURRENT_WORKERS = 5;
export const SUMMARY_WORKERS = 3;
