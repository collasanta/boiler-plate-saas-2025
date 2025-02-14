import DietAutomationRuns from "@/components/dietAutomationRuns";
import { getTranslations } from "next-intl/server";

export default async function Dashboard() {
  const t = await getTranslations("Dashboard");
  // Server action to retrieve runs goes here
  const runs = [
    {
      id: "do4mgrc3at88s",
      createdAt: "2024-08-31T18:04:09.704Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "lr4mwx5-4mx_-",
      templateDietName: "Template - 2000 calorias",
      clientClonedDietId: "lijpogdsep1lo",
      clientClonedDietName: "Template - 2000 calorias",
      receivedResponses: {
        submittedAt: "2024-08-31T18:04:07.053Z",
        gender: "masculino",
        name: "sadasd asdq122",
        email: "asdasdll@gmail.com",
        whatsapp: "+551199595959",
        weight: "85",
        age: "25",
        height: "180",
        goal: "Emagrecimento",
        restrictions: "Diabetes",
        restriction2: "Sim",
        restriction2details: "adasd",
        activities: "Run 🏃",
        activitiesfrequency: "4",
      },
    },
    {
      id: "kodjx6mgwxk7m",
      createdAt: "2024-08-31T18:01:48.365Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "hzqcf8gx9y_hy",
      templateDietName: "Template 2",
      clientClonedDietId: null,
      clientClonedDietName: "Deleted Diet",
      receivedResponses: {
        submittedAt: "2024-08-31T18:01:45.170Z",
        gender: "masculino",
        name: "sadas sadas das",
        email: "asdasds@gmail.com",
        whatsapp: "+5511989865623",
        weight: "89",
        age: "25",
        height: "180",
        goal: "Ganho de Massa",
        restrictions: "Hipertensão",
        restriction2: "Não",
        activities: "Musculação",
        activitiesfrequency: "4",
      },
    },
    {
      id: "me1kbm5fwrv63",
      createdAt: "2024-08-31T17:55:25.942Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "hzqcf8gx9y_hy",
      templateDietName: "Template 2",
      clientClonedDietId: null,
      clientClonedDietName: "Deleted Diet",
      receivedResponses: {
        submittedAt: "2024-08-30T23:17:38.808Z",
        gender: "masculino",
        name: "victor teste ",
        email: "victewewr.collasanta@gmail.com",
        whatsapp: "+551195959595",
        weight: "85",
        age: "25",
        height: "180",
        goal: "Ganho de Massa",
        restrictions: "Diabetes",
        restriction2: "Sim",
        restriction2details: "teste de trestricxoa iposkdpask dposa",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
    {
      id: "28ouh4-4ckl84",
      createdAt: "2024-08-31T17:53:33.533Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "lr4mwx5-4mx_-",
      templateDietName: "Template - 2000 calorias",
      clientClonedDietId: "4jak4ov7oyw34",
      clientClonedDietName: "Template - 2000 calorias",
      receivedResponses: {
        submittedAt: "2024-08-31T17:53:31.063Z",
        gender: "masculino",
        name: "asdasd askpok",
        email: "sadasdsd@gmail.com",
        whatsapp: "+551187878787",
        weight: "85",
        age: "25",
        height: "180",
        goal: "Emagrecimento",
        restrictions: "Diabetes",
        restriction2: "Sim",
        restriction2details: "sadasdas",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
    {
      id: "r0nuddqpdio37",
      createdAt: "2024-08-31T17:45:48.534Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "hzqcf8gx9y_hy",
      templateDietName: "Template 2",
      clientClonedDietId: "053nwp2luqhrk",
      clientClonedDietName: "Template 2",
      receivedResponses: {
        submittedAt: "2024-08-31T17:45:45.791Z",
        gender: "masculino",
        name: "vict tore",
        email: "asdasd@gmail.com",
        whatsapp: "+5511986532654",
        weight: "80",
        age: "27",
        height: "180",
        goal: "Ganho de Massa",
        restrictions: "Diabetes",
        restriction2: "Sim",
        restriction2details: "das das d",
        activities: "Musculação",
        activitiesfrequency: "6",
      },
    },
    {
      id: "8egza81j97gk-",
      createdAt: "2024-08-31T17:35:08.645Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "hzqcf8gx9y_hy",
      templateDietName: "Template 2",
      clientClonedDietId: "_e-ugqtwd7ovm",
      clientClonedDietName: "Template 2",
      receivedResponses: {
        submittedAt: "2024-08-31T17:35:05.274Z",
        gender: "masculino",
        name: "victor colla",
        email: "oskdpso@gmail.com",
        whatsapp: "+5511989898989",
        weight: "85",
        age: "27",
        height: "185",
        goal: "Ganho de Massa",
        restrictions: "Diabetes",
        restriction2: "Não",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
    {
      id: "yha2836vstidu",
      createdAt: "2024-08-31T17:12:24.304Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: "hzqcf8gx9y_hy",
      templateDietName: "Template 2",
      clientClonedDietId: "j97d5duy2797c",
      clientClonedDietName: "Template 2",
      receivedResponses: {
        submittedAt: "2024-08-30T23:17:38.808Z",
        gender: "masculino",
        name: "victor teste ",
        email: "victewewr.collasanta@gmail.com",
        whatsapp: "+551195959595",
        weight: "85",
        age: "25",
        height: "180",
        goal: "Ganho de Massa",
        restrictions: "Diabetes",
        restriction2: "Sim",
        restriction2details: "teste de trestricxoa iposkdpask dposa",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
    {
      id: "3vtnvpqyxq6rl",
      createdAt: "2024-08-30T02:32:23.320Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: null,
      templateDietName: "Deleted Diet",
      clientClonedDietId: null,
      clientClonedDietName: "Deleted Diet",
      receivedResponses: {
        submittedAt: "2024-08-29T23:35:38.880Z",
        gender: "masculino",
        name: "titanium fiseta",
        email: "viccctor.colsslassanta@gmail.com",
        whatsapp: "+551199565227765",
        weight: "85",
        age: "27",
        height: "182",
        goal: "Ganho de Massa",
        restrictions: "Não",
        restriction2: "Sim",
        restriction2details: "tenho genetica de macaco",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
    {
      id: "h_9vf2s7u86ho",
      createdAt: "2024-08-30T00:37:41.689Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: null,
      templateDietName: "Deleted Diet",
      clientClonedDietId: "kz2y3sy4gr30t",
      clientClonedDietName: "Template 2",
      receivedResponses: {
        submittedAt: "2024-08-29T23:35:38.880Z",
        gender: "masculino",
        name: "tiozinho que mora loga ali",
        email: "viccctor.collassanta@gmail.com",
        whatsapp: "+5511995657765",
        weight: "85",
        age: "27",
        height: "182",
        goal: "Ganho de Massa",
        restrictions: "Não",
        restriction2: "Sim",
        restriction2details: "tenho genetica de macaco",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
    {
      id: "0x3w0iw2s0vp6",
      createdAt: "2024-08-30T00:02:57.570Z",
      clientId: null,
      clientName: "Deleted Client",
      templateDietId: null,
      templateDietName: "Deleted Diet",
      clientClonedDietId: null,
      clientClonedDietName: "Deleted Diet",
      receivedResponses: {
        submittedAt: "2024-08-29T23:35:38.880Z",
        gender: "masculino",
        name: "aqui marinho",
        email: "victor.collassanta@gmail.com",
        whatsapp: "+5511995656565",
        weight: "80",
        age: "27",
        height: "182",
        goal: "Ganho de Massa",
        restrictions: "Não",
        restriction2: "Sim",
        restriction2details: "tenho genetica de macaco",
        activities: "Musculação",
        activitiesfrequency: "5",
      },
    },
  ];

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t("title")}</h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">{t("subtitle")}</p>
      </div>
      <div className="max-w-[90%] mx-auto">
        <DietAutomationRuns runs={runs} />
      </div>
    </div>
  );
}
