import { getProfessionalInfos } from "@/lib/professional";

const SettingsPage = async () => {
  const professionalInfos = await getProfessionalInfos();
  if (professionalInfos === null) {
    return <div className="text-center">Erro ao carregar informações</div>;
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Configurações</h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">Ajuste suas preferências</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 flex justify-center text-center">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light  text-center">Nome:</p>
            {professionalInfos.name}
          </div>
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light t text-center">Profissão:</p>
            {professionalInfos.profession}
          </div>
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light text-center">Email:</p>
            {professionalInfos.email}
          </div>
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light text-center">Whatsapp:</p>
            {professionalInfos.whatsapp}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SettingsPage;
