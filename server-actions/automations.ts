"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prismadb from "../lib/prismadb";
import { generateId } from "../lib/utils";

export async function registerDietAutomation(data: { name: string; rule: string }) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    console.log({ data });
    const newAutomation = await prismadb.dietAutomation.create({
      data: {
        id: generateId(),
        name: data.name,
        rule: data.rule,
        professionalId: userId,
      },
    });

    revalidatePath("/automations");

    return { automationId: newAutomation.id };
  } catch (error: any) {
    console.error("Error in registerDietAutomation:", error);
    return { error: error.message || "Erro ao cadastrar a automação de dieta" };
  }
}
