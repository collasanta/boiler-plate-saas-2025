"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const LandingContent = () => {
  const t = useTranslations("Homepage.landingContent");

  const testimonials = [
    {
      key: "nutritionists",
      avatar: "A",
    },
    {
      key: "patients",
      avatar: "J",
    },
  ];

  return (
    <div className="px-10 pb-20 bg-white">
      <h2 className="text-center text-3xl text-white font-extrabold mb-5 text-gray-500 pt-8">{t("title")}</h2>
      <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <Card
            key={item.key}
            className="bg-gradient-to-r hover:animate-pulse bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-400 shadow-lg border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{t(`testimonials.${item.key}.name`)}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">{t(`testimonials.${item.key}.description`)}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
