import { redirect } from "@/i18n/routing";
import { auth } from "@clerk/nextjs/server";
import { getLocale } from "next-intl/server";
import { createSafeActionClient } from "next-safe-action";
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
});

export const authActionClient = publicActionClient.use(async ({ next }) => {
  const { userId } = await auth.protect();

  if (!userId) {
    console.log("User not authenticated");
    redirect({ href: "/sign-in", locale: await getLocale() });
    throw new Error("Session not found!");
  }

  // Return the next middleware with `userId` value in the context
  return next({ ctx: { userId } });
});
