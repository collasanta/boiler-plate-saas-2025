import ClientProfileInteractive from "./client-profile-interactive";

export default async function ClientProfilePage({ params }: { params: { clientId: string } }) {
  const { clientId } = params;
  // SERVER ACTION GOES HERE TO FETCH CLIENT DATA

  //MOCK
  const clientResult = {
    id: "gz3-wbemwh1ef",
    name: "teste",
    whatsapp: "+551148885859",
    email: "afoaskisso@gmail.com",
    info: "",
    genre: "masculino",
    age: 33,
    currentDietPlanId: null,
    currentWorkoutPlanId: null,
    professionalId: "user_2rkkmWBunGoUejrbYtMAvxVXHPH",
    createdAt: new Date(`2025-01-22T09:19:04.873Z`),
    updatedAt: new Date("2025-01-22T09:19:04.873Z"),
    dietPlans: [],
    currentDietPlan: null,
  };

  return <ClientProfileInteractive initialClient={clientResult} />;
}
