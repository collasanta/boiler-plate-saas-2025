// app/en/clients/[clientId]/page.tsx

import { getClient } from "@/lib/client";
import { getDietPlansByProfessional } from "@/lib/diets";
import ClientProfileInteractive from "./client-profile-interactive";
import { GetClientResult } from "@/types/clients";
import { GetDietPlansResult } from "@/types/diets";

export default async function ClientProfilePage({ params }: { params: { clientId: string } }) {
  const { clientId } = params;

  const clientPromise: Promise<GetClientResult> = getClient(clientId);
  const dietPlansPromise: Promise<GetDietPlansResult> = getDietPlansByProfessional();

  const [clientResult, dietPlansResult] = await Promise.all([clientPromise, dietPlansPromise]);

  if ("error" in clientResult) {
    return <div>Erro ao carregar cliente: {clientResult.error}</div>;
  }

  if ("error" in dietPlansResult) {
    return <div>Erro ao carregar dietas: {dietPlansResult.error}</div>;
  }

  return <ClientProfileInteractive initialClient={clientResult} initialDietPlans={dietPlansResult.dietPlans} />;
}
