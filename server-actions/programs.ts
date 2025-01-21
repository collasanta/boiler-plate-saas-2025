"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "../lib/prismadb"
import { generateId } from "../lib/utils"
import { programsFormSchema, programsFormSchemaType } from "@/types/programs"
import { checkClientByWhatsapp, createNewClient } from "./client"
import { revalidatePath } from "next/cache"

export const getUserPrograms = async () => {
  const { userId } = await auth.protect();
  if (!userId) { return { error: "usuário não logado " } }

  try {
    const programs = await prismadb.program.findMany({
      select: {
        id: true,
        name: true,
        start_date: true,
        duration: true,
        end_date: true,
        enabled_metrics: true,
        status: true,
        client: {
          select: {
            name: true,
            whatsapp: true,
          },
        },
      },
      where: {
        professionalId: userId
      },
    });
    return { userPrograms: programs }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getUserProgram = async (programId: string) => {
  try {
    const program = await prismadb.program.findUnique({
      where: { id: programId },
      select: {
        id: true,
        name: true,
        start_date: true,
        duration: true,
        end_date: true,
        enabled_metrics: true,
        status: true,
        client: {
          select: {
            name: true,
            whatsapp: true,
          },
        },
      },
    });

    return { userProgram: program }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const registerNewProgram = async (finalForm: programsFormSchemaType) => {
  try {
    let { userId } = await auth.protect();
    if (!userId) { return { error: "usuário não logado " } }

    const typeCheck = programsFormSchema.safeParse(finalForm)
    if (!typeCheck.success) { return { error: typeCheck.error.format() } }

    let clientId = await checkClientByWhatsapp(finalForm.clientWhatsapp);

    if (clientId === false) {
      clientId = await createNewClient(finalForm.clientWhatsapp, finalForm.clientName, userId);
    }

    if (typeof clientId === 'object' && 'error' in clientId) {
      return { error: clientId.error };
    }

    const enabled_metrics = {
      peso: finalForm.metricspeso,
      dieta: finalForm.metricsdieta,
      treino: finalForm.metricstreino,
      cardio: finalForm.metricscardio
    }

    const newProgram = await prismadb.program.create({
      data: {
        id: generateId(),
        name: finalForm.programName,
        professionalId: userId,
        start_date: finalForm.startDate,
        duration: finalForm.duration!,
        end_date: finalForm.endDate!,
        enabled_metrics: enabled_metrics,
        status: "created",
        clientId: clientId,
        daysActive: 0,
        daysPaid: 0,
      }
    })

    const newDays = createProgramDays(newProgram.id, finalForm.startDate, finalForm.duration!)
    if (typeof newDays === 'object' && 'error' in newDays) {
      return { error: newDays.error };
    }
    
    revalidatePath(`/p/${newProgram.id}`)
    return { programId: newProgram.id }

  } catch (error: any) {
    return { error: error.message }
  }
}

export const deleteProgram = async (programId: string) => {
  try {
    const deleteWebPushSubscriptions = await prismadb.webPushSubscriptions.deleteMany({
      where: {
        programId: programId
      }
    })

    const deleteDays = await prismadb.dailyData.deleteMany({
      where: {
        programId: programId
      }
    })

    const deleteCheckpoints = await prismadb.checkpoint.deleteMany({
      where: {
        programId: programId
      }
    })

    const deleteProgram = await prismadb.program.delete({
      where: {
        id: programId
      }
    })

    revalidatePath(`/app/dashboard`)
    return { status: "deleted" }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getProgramDays = async (programId: string) => {
  const enabledMetrics = await prismadb.program.findUnique({
    where: {
      id: programId
    },
    select: {
      enabled_metrics: true
    }
  })

  try {
    const days = await prismadb.dailyData.findMany({
      where: {
        programId: programId
      },
      select: {
        date: true,
        diet: await getActiveMetricsDB(enabledMetrics?.enabled_metrics, "dieta"),
        exercise: await getActiveMetricsDB(enabledMetrics?.enabled_metrics, "treino"),
        cardio: await getActiveMetricsDB(enabledMetrics?.enabled_metrics, "cardio"),
        weight: await getActiveMetricsDB(enabledMetrics?.enabled_metrics, "peso"),
        notes: true,
        checkpointId: true,
        programId: true
      },
      orderBy: {
        date: "asc"
      }
    })
    const daysWithWeightAsString = days.map(day => ({
      ...day,
      weight: day?.weight ? day.weight.toString() : null,
      cardio: day?.cardio ? day.cardio.toString() : null
    }));
    return { days: daysWithWeightAsString }
  } catch (error: any) {
    return { error: error.message }
  }
}

const createProgramDays = async (programId: string, startDate: Date, duration: number) => {
  try {
    const days = []
    let currentDate = startDate
    let day = 1

    while (day <= duration) {
      if (day === 1) {
        const checkpoint = await createCheckpoint(programId, currentDate, "initial")
        if (typeof checkpoint === 'object' && 'error' in checkpoint) {
          return { error: checkpoint.error }
        }
        days.push({
          programId: programId,
          date: currentDate,
          checkpointId: checkpoint.checkpoint
        })
      } else if (day % 30 === 0 && day !== 1 && day !== duration) { // avaliacao mensal
        const checkpoint = await createCheckpoint(programId, currentDate, "review")
        if (typeof checkpoint === 'object' && 'error' in checkpoint) {
          return { error: checkpoint.error }
        }
        days.push({
          programId: programId,
          date: currentDate,
          checkpointId: checkpoint.checkpoint
        })
      } else if (day === duration) {
        const checkpoint = await createCheckpoint(programId, currentDate, "final")
        if (typeof checkpoint === 'object' && 'error' in checkpoint) {
          return { error: checkpoint.error }
        }
        days.push({
          programId: programId,
          date: currentDate,
          checkpointId: checkpoint.checkpoint
        })
      } else {
        days.push({
          programId: programId,
          date: currentDate,
        })
      }
      day++
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    }

    const newDays = await prismadb.dailyData.createMany({
      data: days
    })
    return { days: newDays }
  } catch (error: any) {
    return { error: error.message }
  }
}

const createCheckpoint = async (programId: string, date: Date, description: string) => {
  try {
    const checkpoint = await prismadb.checkpoint.create({
      data: {
        date: date,
        programId: programId,
        description: description
      }
    })
    return { checkpoint: checkpoint.id }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getProperty = async (name: string) => {
  if (name === "peso") {
    return "weight"
  } else if (name === "dieta") {
    return "diet"
  } else if (name === "treino") {
    return "exercise"
  }
}

const getActiveMetricsDB = async (enabledMetrics: any, metric: string) => {
  if (enabledMetrics[`${metric}`] === true) {
    return true
  }
  return false
}

export const setDiet = async (date: Date, programId: string, boolean: boolean) => {
  try {
    const result = await prismadb.dailyData.update({
      where: {
        programId_date: {
          programId: programId,
          date: date,
        },
      },
      data: {
        diet: boolean
      }
    })
  } catch (error: any) {
    revalidatePath(`/p/${programId}`)
  }
}

export const setExercise = async (date: Date, programId: string, boolean: boolean) => {
  try {
    const result = await prismadb.dailyData.update({
      where: {
        programId_date: {
          programId: programId,
          date: date,
        },
      },
      data: {
        exercise: boolean
      }
    })
  } catch (error: any) {
    revalidatePath(`/p/${programId}`)
  }
}

export const setWeight = async (date: Date, programId: string, weight: string | null, oldWeight: string | null) => {
  if (weight === "" && oldWeight !== null) {
    weight = null
  } else if (weight === "" && oldWeight === null) {
    return
  }

  if (weight !== null) {
    weight = weight?.replace(',', '.')
    if (/^-?\d+(\.\d+)?$/.test(weight!) === false) {
      revalidatePath(`/p/${programId}`)
      return
    }
  }

  try {
    const result = await prismadb.dailyData.update({
      where: {
        programId_date: {
          programId: programId,
          date: date,
        },
      },
      data: {
        weight: weight
      }
    })
  } catch (error: any) {
    revalidatePath(`/p/${programId}`)
  }
}

export const setCardio = async (date: Date, programId: string, cardio: string | null, oldCardio: string | null) => {
  if (cardio === "" && oldCardio !== null) {
    cardio = null
  } else if (cardio === "" && oldCardio === null) {
    return
  }

  try {
    const result = await prismadb.dailyData.update({
      where: {
        programId_date: {
          programId: programId,
          date: date,
        },
      },
      data: {
        cardio: cardio !== null ? parseInt(cardio) : null
      }
    })
  } catch (error: any) {
    revalidatePath(`/p/${programId}`)
  }
}

export const setNotes = async (date: Date, programId: string, notes: string, oldnote: string) => {
  if (notes === undefined) {
    return
  } else if (notes === oldnote) {
    return
  }
  try {
    const result = await prismadb.dailyData.update({
      where: {
        programId_date: {
          programId: programId,
          date: date,
        },
      },
      data: {
        notes: notes
      }
    })
  } catch (error: any) {
    revalidatePath(`/p/${programId}`)
  }
}

export const getCheckpointsByProgramId = async (programId: string) => {
  const checkpoints = await prismadb.checkpoint.findMany({
    where: {
      programId: programId
    },
    orderBy: {
      date: "asc"
    }
  })
  return { checkpoints: checkpoints }
}

export const getCheckpointById = async (checkpointId: string) => {
  const checkpoint = await prismadb.checkpoint.findUnique({
    where: {
      id: checkpointId
    }
  })
  return { checkpoint: checkpoint }
}

export const setFormsLink = async (checkpointId: string, link: string | null, oldLink: string) => {
  if (link === null) {
    return
  } else if (link === oldLink) {
    return
  } else if (link === "" && oldLink !== null) {
    link = null
  } else if (link === "" && oldLink === null) {
    return
  }

  const result = await prismadb.checkpoint.update({
    where: {
      id: checkpointId
    },
    data: {
      formUrl: link
    }
  })

  revalidatePath(`/p/${result.programId}`)
}

export const setDietLink = async (checkpointId: string, link: string | null, oldLink: string) => {
  if (link === null) {
    return
  } else if (link === oldLink) {
    return
  } else if (link === "" && oldLink !== null) {
    link = null
  } else if (link === "" && oldLink === null) {
    return
  }

  const result = await prismadb.checkpoint.update({
    where: {
      id: checkpointId
    },
    data: {
      dietPlanUrl: link
    }
  })

  revalidatePath(`/p/${result.programId}`)
  console.log("dietPlanUrl set: ", "value:", result.dietPlanUrl)
}

export const setTrainingLink = async (checkpointId: string, link: string | null, oldLink: string) => {
  if (link === null) {
    return
  } else if (link === oldLink) {
    return
  } else if (link === "" && oldLink !== null) {
    link = null
  } else if (link === "" && oldLink === null) {
    return
  }

  const result = await prismadb.checkpoint.update({
    where: {
      id: checkpointId
    },
    data: {
      trainingPlanUrl: link
    }
  })

  revalidatePath(`/p/${result.programId}`)
}

export const setFormFilled = async (checkpointId: string, boolean: boolean, oldBoolean: boolean) => {
  if (boolean === oldBoolean) {
    return
  }

  const result = await prismadb.checkpoint.update({
    where: {
      id: checkpointId
    },
    data: {
      formFilled: boolean
    }
  })
  revalidatePath(`/p/${result.programId}`)
}


