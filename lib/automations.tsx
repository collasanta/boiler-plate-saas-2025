"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prismadb from "./prismadb";
import { generateId } from "./utils";

export async function registerDietAutomation(data: {
  name: string;
  rule: string;
}) {
  try {
    const { userId } = auth();
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

export async function getDietAutomationsByProfessional() {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const dietAutomations = await prismadb.dietAutomation.findMany({
      where: {
        professionalId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { dietAutomations };
  } catch (error: any) {
    console.error("Error fetching diet automations:", error);
    return { error: error.message };
  }
}

export async function deleteAutomation(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Usuário não autenticado");
    }

    await prismadb.dietAutomation.delete({
      where: {
        id: id,
        professionalId: userId,
      },
    });

    revalidatePath("/automations");
  } catch (error: any) {
    console.error("Error deleting automation:", error);
    throw error;
  }
}

export async function getAutomationById(id: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const automation = await prismadb.dietAutomation.findUnique({
      where: {
        id: id,
        professionalId: userId,
      },
    });

    if (!automation) {
      return { error: "Automação não encontrada" };
    }

    return { automation };
  } catch (error: any) {
    console.error("Error fetching automation:", error);
    return { error: error.message };
  }
}

export async function updateAutomation(
  id: string,
  data: { name: string; rule: string }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Usuário não autenticado");
    }

    const updatedAutomation = await prismadb.dietAutomation.update({
      where: {
        id: id,
        professionalId: userId,
      },
      data: {
        name: data.name,
        rule: data.rule,
      },
    });

    revalidatePath("/automations");
    revalidatePath(`/automations/${id}`);
    return updatedAutomation;
  } catch (error: any) {
    console.error("Error updating automation:", error);
    return { error: error.message };
  }
}

export async function getAutomationRuns(automationId: string) {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const runs = await prismadb.dietAutomationRun.findMany({
      where: {
        automationId: automationId,
        professional: { id: userId },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        templateDiet: {
          select: {
            id: true,
            name: true,
          },
        },
        clientClonedDiet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedRuns = runs.map((run) => ({
      id: run.id,
      createdAt: run.createdAt.toISOString(),
      clientId: run.client?.id ?? null,
      clientName: run.client?.name ?? "Deleted Client",
      templateDietId: run.templateDiet?.id ?? null,
      templateDietName: run.templateDiet?.name ?? "Deleted Diet",
      clientClonedDietId: run.clientClonedDiet?.id ?? null,
      clientClonedDietName: run.clientClonedDiet?.name ?? "Deleted Diet",
      receivedResponses:
        typeof run.receivedResponses === "string"
          ? JSON.parse(run.receivedResponses)
          : run.receivedResponses,
    }));

    return { runs: formattedRuns };
  } catch (error: any) {
    console.error("Error fetching automation runs:", error);
    return { error: error.message };
  }
}
