# SummaryX-Queue

This project is a queue-based system for processing GitHub repositories, generating summaries of code files using Google Gemini AI, and providing real-time updates via Pusher. It uses BullMQ for task management, Prisma for database interaction, and Redis for caching and job tracking.

## 🧰 Technology Stack

| Technology       | Purpose/Role                                                             |
| ---------------- | ------------------------------------------------------------------------ |
| Express.js       | Web framework for building the API.                                      |
| BullMQ           | Queueing system for managing asynchronous tasks.                         |
| Google Gemini AI | AI model for generating code summaries.                                  |
| Redis            | In-memory data store for caching, job tracking, and real-time updates.   |
| Prisma           | ORM for database interactions.                                           |
| TypeScript       | Adds static typing to JavaScript.                                        |
| Octokit          | GitHub API client library.                                               |
| JWT              | JSON Web Tokens for authentication and authorization.                    |
| Pusher           | Real-time messaging service for providing processing updates to clients. |
| ioredis          | Redis client library.                                                    |

## 📁 File Structure and Purpose

| File Path                                  | Description                                                       |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `package.json`                             | Lists project dependencies and scripts.                           |
| `tsconfig.json`                            | Configures the TypeScript compiler.                               |
| `prisma/schema.prisma`                     | Defines the database schema using Prisma.                         |
| `src/index.ts`                             | Main application entry point, sets up the Express.js server.      |
| `src/lib/gemini.ts`                        | Interacts with Google Gemini AI for summary generation.           |
| `src/lib/redis.ts`                         | Configures and manages the Redis connection.                      |
| `src/lib/pusher/send-update.ts`            | Sends real-time processing updates via Pusher.                    |
| `src/lib/pusher/server.ts`                 | Sets up the Pusher server instance.                               |
| `src/lib/cancel-jobs.ts`                   | Provides functionality to cancel all repository jobs.             |
| `src/lib/constants.ts`                     | Defines constants used throughout the application.                |
| `src/lib/github.ts`                        | Provides functions for interacting with the GitHub API.           |
| `src/lib/prisma.ts`                        | Sets up the Prisma client for database interactions.              |
| `src/lib/prompt.ts`                        | Defines the system prompt for Gemini AI.                          |
| `src/lib/redis-keys.ts`                    | Defines functions for generating Redis keys.                      |
| `src/interfaces/github.ts`                 | Defines the interface for representing GitHub repository content. |
| `src/controllers/clean.ts`                 | Controller logic for handling clean job requests.                 |
| `src/controllers/queue.ts`                 | Controller for adding jobs to the repository queue.               |
| `src/queues/repository.ts`                 | Sets up BullMQ queues for managing asynchronous tasks.            |
| `src/middleware/verify-clean-job-token.ts` | Middleware for verifying JWT tokens for clean job requests.       |
| `src/middleware/verify-service-token.ts`   | Middleware for verifying service tokens.                          |
| `src/routes/clean.ts`                      | Defines Express routes for cleaning jobs.                         |
| `src/routes/queue.ts`                      | Defines Express routes for adding jobs to the repository queue.   |
| `src/workers/directory.ts`                 | BullMQ worker for processing directory structures from GitHub.    |
| `src/workers/log.ts`                       | BullMQ worker for logging repository processing events.           |
| `src/workers/repository.ts`                | BullMQ worker for managing repository processing.                 |
| `src/workers/summary.ts`                   | BullMQ worker for generating summaries for files.                 |
| `package-lock.json`                        | Contains the exact versions of all project dependencies.          |
