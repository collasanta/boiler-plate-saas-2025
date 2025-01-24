import { useTranslations } from "next-intl";

const SettingsPage = () => {
  const t = useTranslations("Settings");
  const professionalInfos = {
    id: "user_2rkkmWBunGoUejrbYtMAvxVXHPH",
    name: "Teste inicial",
    profession: "papito",
    avgClientsSurvey: 23,
    email: "hirella.ai@gmail.com",
    whatsapp: "+12312321312",
    createdAt: "2025-01-17T10:44:06.406Z",
    updatedAt: "2025-01-17T10:44:06.406Z",
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">{t("title")}</h2>
        <p className="text-muted-foreground font-light text-small md:text-lg text-center">{t("description")}</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 flex justify-center text-center">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light text-center">{t("profile.name")}</p>
            {professionalInfos.name}
          </div>
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light text-center">{t("profile.profession")}</p>
            {professionalInfos.profession}
          </div>
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light text-center">{t("profile.email")}</p>
            {professionalInfos.email}
          </div>
          <div className="flex flex-col text-gray-600 text-sm">
            <p className="pl-2 text-muted-foreground font-light text-center">{t("profile.whatsapp")}</p>
            {professionalInfos.whatsapp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
