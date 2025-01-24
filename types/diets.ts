import { Prisma } from "@prisma/client";
import { ClientWithCurrentDiet } from "./clients";

export type DietPlanWithClient = Prisma.DietPlanGetPayload<{
  include: { client: true };
}>;

export type GetDietPlansResult =
  | { dietPlans: DietPlanWithClient[]; error?: undefined }
  | { error: string; dietPlans?: undefined };

export type ClientProfileInteractiveProps = {
  initialClient: ClientWithCurrentDiet;
};

export type DietFormSchemaType = {
  dietName: string;
  dietContent: string;
  isTemplate: boolean;
  clientId?: string;
  replaceCurrentDiet?: boolean;
};

export type DietPlanType = Prisma.DietPlanGetPayload<object>;
