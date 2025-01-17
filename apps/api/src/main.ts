import { ExpressFactory } from "@/core/express";
import appRouter from "@/network";
import { printAppInfo } from "@/utils";
import { Logger } from "@syncora/logger";

import { connectPrisma, disconnectPrisma } from "./lib/prisma.lib";
import { requestLogger } from "./middlewares";
import "@/lib/dotenv.lib";

function bootstrap(process: NodeJS.Process, cpuCount: number) {
  return async () => {
    try {
      const app = await ExpressFactory.create(appRouter);
      const PORT = process.env.BACKEND_PORT ?? "3000";
      /**
       ** Routes can be accessed in /api/v1. "Check /core/config/application.config.ts" to configure routes
       *
       ** Some middlewares might be hard to find so we'll keep the 'cors' in main.ts
       ** you can add more middlewares here.
       */
      app.enableCors({
        origin: true,
        credentials: true,
      });

      app.use(requestLogger()); // <-- example of adding middleware

      await connectPrisma();
      await app.listen(PORT, () => {
        printAppInfo(
          cpuCount,
          cpuCount,
          process.pid,
          `Worker ${process.pid}: Prisma and Redis Connected`,
          `Worker ${process.pid}: Server started on port ${PORT}`
        );
      });
    } catch (error) {
      Logger.error(`Worker ${process.pid}: Connection failed: ${error}`);
      await disconnectPrisma();
      process.exit(1);
    }
  };
}

export { bootstrap };
