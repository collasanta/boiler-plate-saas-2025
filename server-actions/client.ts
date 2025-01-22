"use server";

import { authActionClient } from "@/lib/safe-action";
import { clientsFormSchema, ClientsFormSchemaType } from "@/types/clients";
import { auth } from "@clerk/nextjs/server";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import prismadb from "../lib/prismadb";
import { generateId } from "../lib/utils";

export const createNewClient2 = authActionClient
  .metadata({ actionName: "createNewClient2" })
  .schema(clientsFormSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: client, ctx: { userId } }) => {
    console.log("Creating new client in action");
    const newClient = await prismadb.client.create({
      data: {
        id: generateId(),
        name: client.clientName,
        whatsapp: client.clientWhatsapp,
        email: client.clientEmail,
        genre: client.clientSex,
        age: client.clientAge,
        professionalId: userId,
      },
    });

    revalidatePath("/app/clients");
    return { clientId: newClient.id };
    // unique function
  });

export async function createNewClient(clientData: ClientsFormSchemaType) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const newClient = await prismadb.client.create({
      data: {
        id: generateId(),
        name: clientData.clientName,
        whatsapp: clientData.clientWhatsapp,
        email: clientData.clientEmail,
        genre: clientData.clientSex,
        age: clientData.clientAge,
        professionalId: userId,
      },
    });

    revalidatePath("/app/clients");
    return { clientId: newClient.id };
  } catch (error: any) {
    console.error("Error in createNewClient:", error);
    return { error: error.message };
  }
}

export const getClientsByProfessional = async () => {
  const { userId } = await auth.protect();
  if (!userId) {
    return { error: "usuário não logado " };
  }

  try {
    const clients = await prismadb.client.findMany({
      where: { professionalId: userId },
    });
    return clients;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getClient = async (clientId: string) => {
  const { userId } = await auth.protect();
  if (!userId) {
    return { error: "usuário não logado " };
  }

  try {
    const client = await prismadb.client.findUnique({
      where: { id: clientId },
      include: {
        dietPlans: true,
        currentDietPlan: true,
      },
    });

    if (!client) {
      return {
        error: "Cliente não encontrado",
      };
    }

    if (client.professionalId !== userId) {
      return {
        error: "Cliente não pertence ao profissional",
      };
    }

    if (client.currentDietPlan) {
      client.currentDietPlan.name = `${client.currentDietPlan.name} - ${client.name}`;
    }

    return client;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export async function updateClientDiet(clientId: string, dietId: string) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const diet = await prismadb.dietPlan.findUnique({
      where: { id: dietId, professionalId: userId },
    });

    if (!diet) {
      throw new Error("Dieta não encontrada ou não pertence ao usuário");
    }

    let newDiet;
    if (diet.clientId !== clientId) {
      newDiet = await prismadb.dietPlan.create({
        data: {
          id: generateId(),
          professionalId: userId,
          clientId: clientId,
          content: diet.content,
          name: diet.name,
        },
      });
      console.log(`Nova dieta criada (${newDiet.id}) - Clonada de ${dietId} `);
    }

    const updatedClient = await prismadb.client.update({
      where: { id: clientId, professionalId: userId },
      data: { currentDietPlanId: newDiet ? newDiet.id : dietId },
      include: {
        currentDietPlan: true,
      },
    });

    if (updatedClient.currentDietPlan) {
      updatedClient.currentDietPlan.name = `${updatedClient.currentDietPlan?.name} - ${updatedClient.name}`;
    }

    revalidatePath(`/app/clients/${clientId}`);
    revalidatePath(`/app/clients`);
    return { success: true, client: updatedClient };
  } catch (error: any) {
    console.error("Error updating client diet:", error);
    return { error: error.message || "Erro ao atualizar dieta do cliente" };
  }
}

export async function deleteClient(clientId: string) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { status: "error", error: "Usuário não autenticado" };
    }

    const client = await prismadb.client.findUnique({
      where: { id: clientId, professionalId: userId },
    });

    if (!client) {
      return { status: "error", error: "Cliente não encontrado ou não pertence ao usuário" };
    }

    await prismadb.client.delete({
      where: { id: clientId },
    });

    revalidatePath("/app/clients");
    return { status: "deleted" };
  } catch (error: any) {
    console.error("Error in deleteClient:", error);
    return { status: "error", error: error.message };
  }
}

export async function updateClientInfo(clientId: string, info: string) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const updatedClient = await prismadb.client.update({
      where: { id: clientId, professionalId: userId },
      data: { info },
    });

    revalidatePath(`/app/clients/${clientId}`);
    return { client: updatedClient };
  } catch (error) {
    console.error("Error updating client info:", error);
    return { error: "Failed to update client info" };
  }
}
