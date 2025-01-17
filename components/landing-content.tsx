"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Nutricionistas",
    avatar: "A",
    title: "Designer",
    description: "Acompanhe o progresso dos seus pacientes de perto, diariamente, e de forma única. E automatize o envio de anameneses e feedbacks ",
  },
  {
    name: "Pacientes",
    avatar: "J",
    title: "Software Engineer",
    description: "Relate diariamente sua evolução, e receba feedbacks do seu profissional de saúde de forma mais acertiva e personalizada",
  }
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20 bg-white">
      <h2 className="text-center text-3xl text-white font-extrabold mb-5 text-gray-500 pt-8">Feito para:</h2>
      <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-gradient-to-r hover:animate-pulse bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-400 shadow-lg border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}