"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { DietFormSchemaType, DietPlanWithClient, GetDietPlansResult } from "@/types/diets"
import { generateId } from "../lib/utils"

export async function getDietPlanById(id: string) {
  try {
    const { userId } = await auth.protect();;
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const dietPlan = await prismadb.dietPlan.findUnique({
      where: {
        id: id,
        professionalId: userId,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!dietPlan) {
      return { error: "Plano de dieta não encontrado" };
    }

    return { dietPlan };

  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteDiet(dietId: string) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { status: "error", error: "Usuário não autenticado" }
    }

    const diet = await prismadb.dietPlan.findUnique({
      where: { id: dietId, professionalId: userId },
    })

    if (!diet) {
      return { status: "error", error: "Dieta não encontrada ou não pertence ao usuário" }
    }

    await prismadb.dietPlan.delete({
      where: { id: dietId },
    })

    revalidatePath('/diets')
    return { status: "deleted" }
  } catch (error: any) {
    console.error("Error in deleteDiet:", error)
    return { status: "error", error: error.message }
  }
}

export async function updateDietContent(dietId: string, content: string) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Unauthorized" }
    }

    const updatedDiet = await prismadb.dietPlan.update({
      where: {
        id: dietId,
        professionalId: userId,
      },
      data: {
        content,
      },
    })

    revalidatePath(`/diets/${dietId}`)
    revalidatePath('/diets')
    return { success: true, diet: updatedDiet }
  } catch (error) {
    console.error("Error updating diet content:", error)
    return { error: "Failed to update diet content" }
  }
}

export async function getDietPlansByProfessional(): Promise<GetDietPlansResult> {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const dietPlans = await prismadb.dietPlan.findMany({
      where: {
        professionalId: userId,
      },
      include: {
        client: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    dietPlans.forEach((diet) => {
      if (diet.client) {
        diet.name = `${diet.name} - ${diet.client.name}`;
      }
    });

    return { dietPlans };

  } catch (error: any) {
    console.error("Error fetching diet plans:", error);
    return { error: error.message };
  }
}

export async function registerNewDiet(data: DietFormSchemaType) {
  try {
    const { userId } = await auth.protect();
    if (!userId) {
      return { error: "Usuário não autenticado" }
    }

    const newDiet = await prismadb.dietPlan.create({
      data: {
        id: generateId(),
        name: data.dietName,
        content: data.dietContent,
        isTemplate: data.isTemplate,
        professionalId: userId,
        clientId: data.clientId || null
      }
    })
    
    if (data.replaceCurrentDiet) {
      await prismadb.client.update({
        where: { id: data.clientId },
        data: {
          currentDietPlanId: newDiet.id
        }
      })
      revalidatePath(`/app/clients/${newDiet.clientId}`)
    }

    revalidatePath('/diets')

    return { dietId: newDiet.id }

  } catch (error: any) {
    console.error("Error in registerNewDiet:", error)
    return { error: error.message || "Erro ao cadastrar a dieta" }
  }
}

export async function getClientWithCurrentDiet(clientId: string) {
  try {
    const { userId } = await auth.protect();;
    if (!userId) {
      return { error: "Usuário não autenticado" };
    }

    const client = await prismadb.client.findUnique({
      where: {
        id: clientId,
        professionalId: userId,
      },
      include: {
        currentDietPlan: true,
      },
    });

    if (!client) {
      return { error: "Cliente não encontrado" };
    }

    return client

  } catch (error: any) {
    return { error: error.message };
  }
}
