import { PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "@/i18n/routing";
import { getClientsByProfessional } from "@/lib/client";
import ClientCard from "@/components/clientCard.";
import { Button } from "@/components/ui/button";

const ClientsPage = async () => {
  const userClients = await getClientsByProfessional();

  if ("error" in userClients) {
    toast.error("Erro ao carregar programas: " + userClients.error);
    return null;
  }

  return (
    <div className="pb-[100px]">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Profiles</h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">Acompanhe seus Clientes</p>
      </div>
      <div className="px-4 flex justify-center md:px-20 lg:px-32 space-y-4 items-center">
        <Link href="/clients/register">
          <Button className="p-4 flex shadow-md">
            <PlusIcon className="w-6 h-6 pr-2" />
            Register New Profile
          </Button>
        </Link>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 pt-8 mx-auto flex flex-col justify-center md:min-w-[400px]">
        {userClients &&
          userClients?.map((client) => (
            <ClientCard key={client.id} client={client} />
            // <ProgramCard
            //   key={program.id}
            //   program={program}
            // />
          ))}
      </div>
    </div>
  );
};

export default ClientsPage;
