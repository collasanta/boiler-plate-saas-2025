import ClientCard from "@/components/clientCard.";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getClientsByProfessional2 } from "@/server-actions/client";
import { PlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import toast from "react-hot-toast";

const ClientsPage = async () => {
  const t = await getTranslations("Clients");
  const userClients = await getClientsByProfessional2();

  if (!userClients?.data || userClients.serverError) return toast.error(t("loadError") + userClients?.serverError);

  return (
    <div className="pb-[100px]">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">{t("title")}</h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">{t("subtitle")}</p>
      </div>
      <div className="px-4 flex justify-center md:px-20 lg:px-32 space-y-4 items-center">
        <Link href="/app/clients/register">
          <Button className="p-4 flex shadow-md">
            <PlusIcon className="w-6 h-6 pr-2" />
            {t("register")}
          </Button>
        </Link>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 pt-8 mx-auto flex flex-col justify-center md:min-w-[400px]">
        {userClients?.data.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;
