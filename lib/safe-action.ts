import { redirect } from "@/i18n/routing";
import { auth } from "@clerk/nextjs/server";
import { getLocale } from "next-intl/server";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const publicActionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;
    // could add sentry here
    console.log(`Error in ${metadata?.actionName}:`, `Client input: ${clientInput}`, e);
    if (e.message.includes("Database")) {
      return "Database error";
    }
  },
  throwValidationErrors: true,
});

const checkUserLoggedInMiddleware = createMiddleware().define(async ({ next }) => {
  const { userId } = await auth.protect();

  if (!userId) {
    console.log("User not authenticated");
    redirect({ href: "/sign-in", locale: await getLocale() });
    throw new Error("Session not found!");
  }

  // Return the next middleware with `userId` value in the context
  return next({ ctx: { userId } });
});

const loggingMiddleware = createMiddleware().define(async ({ next, clientInput, metadata }) => {
  console.log(`----------LOGGING MIDDLEWARE START: ${metadata.actionName}----------------`);
  console.log("Client input ->", clientInput);

  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  console.log("Result ->", result);
  console.log("Action execution took", (endTime - startTime).toString().split(".")[0], "s");
  console.log(`----------LOGGING MIDDLEWARE FINISH: ${metadata.actionName}----------------`);

  // And then return the result of the awaited action.
  return result;
});

export const authActionClient = publicActionClient
  .use(loggingMiddleware) // ONLY IN DEV
  .use(checkUserLoggedInMiddleware);
