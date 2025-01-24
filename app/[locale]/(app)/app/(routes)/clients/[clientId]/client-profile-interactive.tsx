"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { ClientProfileInteractiveProps } from "@/types/diets";
import { CalendarIcon, FileBadge, InfoIcon, LockIcon, MailIcon, PencilIcon, PhoneIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";

export default function ClientProfileInteractive({ initialClient }: ClientProfileInteractiveProps) {
  const [client, setClient] = useState(initialClient);

  const [currentDiet, setCurrentDiet] = useState(initialClient.currentDietPlan);
  const [isChangingDiet, setIsChangingDiet] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-2">Perfil do Cliente</h1>
      <p className="text-muted-foreground text-center mb-8">Informações detalhadas do cliente</p>

      <Card className="max-w-2xl mx-auto mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl">{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl mb-1">{client.name}</CardTitle>
            <CardDescription>Cliente desde {new Date(client.createdAt).toLocaleDateString("pt-BR")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <PhoneIcon className="text-muted-foreground" />
              <span>{client.whatsapp || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="text-muted-foreground" />
              <span>{client.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-muted-foreground" />
              <span>
                Atualizado em: {new Date(client.updatedAt).toLocaleDateString("pt-BR")} às{" "}
                {new Date(client.updatedAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{client.genre || "Gênero não especificado"}</Badge>
              <Badge variant="outline">{client.age ? `${client.age} anos` : "Idade não especificada"}</Badge>
            </div>

            {/* Informações Adicionais section */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <InfoIcon className="w-5 h-5" />
                  Context
                </h3>
              </div>
              <div className="max-h-[100px] overflow-y-auto border rounded-md p-2">
                {/* <EditableClientInfo initialInfo={client.info || "{}"} clientId={client.id} /> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl mb-1 flex items-center gap-2">
            <FileBadge className="w-6 h-6" /> Resume
          </CardTitle>
          <CardDescription>Manage Profile Resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div>
              <h3 className="font-semibold mb-2">Current Resume</h3>
              <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                <LockIcon className="text-muted-foreground" />
                <span className="flex-grow">{currentDiet ? currentDiet.name : "No Resume attached to this profile"}</span>
                {currentDiet && (
                  <Link href={`/diets/${currentDiet.id}?editing=true`}>
                    <Button variant="outline" size="sm">
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsChangingDiet(!isChangingDiet)} className="flex-1" variant="outline">
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Change Current Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
