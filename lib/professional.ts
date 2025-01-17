'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"
import prismadb from "./prismadb"
import { professionalFormType } from "@/types/professionals"

export const isNewUser = async () => {
    const { userId } = auth()
    if (!userId) { return { error: "usuário não logado " } }

    const professional = await prismadb.professional.findUnique({
        where: { id: userId },
    })
    if (!professional) {
        return true
    } else {
        return false
    }
}

export const createNewProfessional = async (formData: professionalFormType) => {
    const { userId } = auth()
    if (!userId) { return { error: "usuário não logado " } }

    try {
        const user = await clerkClient.users.getUser(userId!)
        const email = user.emailAddresses[0].emailAddress
        const newProfessional = await prismadb.professional.create({
            data: {
                name: formData.professionalName,
                profession: formData.professionalJob,
                id: userId,
                avgClientsSurvey: formData.professionalAvgClientsSurvey,
                email: email,
                whatsapp: formData.whatsapp,
            },
        });
        console.log("Novo profissional criado: ", newProfessional)
        return true

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const checkIfProfessionalOwnsProgram = async (programId: string) => {
    const { userId } = auth()
    if (!userId) { return false }

    const professional = await prismadb.professional.findUnique({
        where: { id: userId },
        include: {
            programs: true,
        },
    })
    if (!professional) {
        return false
    } else {
        const program = professional.programs.find((program) => program.id === programId)
        if (program) {
            return true
        } else {
            return false
        }
    }
}

export const getProfessionalInfos = async () => {
    const { userId } = auth()
    if (!userId) { return null }

    try {
        const professional = await prismadb.professional.findUnique({
            where: { id: userId },
        })

        if (!professional) {
            return null
        } else {
            return professional
        }
    } catch (error: any) {
        return null
    }
}



