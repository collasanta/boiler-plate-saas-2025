import * as z from "zod"
import { DietPlanType } from "./diets";
import { WorkoutPlanType } from "./workouts";
import { ProgramType } from "./programs";

export const professionalFormSchema = z.object({
    professionalName: z.string().min(6, {
      message: "Favor inserir Nome e Sobrenome",
    }),
    professionalJob: z.string().min(6, {
      message: "Favor inserir sua Profissão",
    }),
    professionalAvgClientsSurvey:  z.coerce.number().min(0, {
      message: "Favor inserir quantos pacientes atende por mês",
    }),
    // email: z.string().email({
    //   message: "Favor inserir um email válido",
    // }),
    whatsapp: z.string().refine((value) => {
      const whatsappRegex = /^\+\d{1,3}\d{6,}$/;
      return whatsappRegex.test(value);
    }, {
      message: "Número de WhatsApp incorreto. Deve estar no formato internacional +5511991234567",
    }),
  });

  export type professionalFormType =  z.infer<typeof professionalFormSchema>

  export type ProfessionalType = {
    id: string;
    name: string | null;
    profession: string | null;
    avgClientsSurvey: number | null;
    email: string | null;
    whatsapp: string | null;
    clients: Client[];
    programs: ProgramType[];
    dietPlans: DietPlanType[];
    workoutPlans: WorkoutPlanType[];
    createdAt: Date;
    updatedAt: Date;
  };