"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createNewClient } from "@/lib/client";
import toast from "react-hot-toast";

const clientFormSchema = z.object({
  clientName: z.string().min(1, "Nome do cliente é obrigatório"),
  clientWhatsapp: z.string().min(1, "WhatsApp do cliente é obrigatório"),
  clientEmail: z.string().email("Email inválido"),
  clientSex: z.enum(["masculino", "feminino"]),
  clientAge: z.number().min(1, "Idade deve ser maior que 0"),
  currentDietPlanId: z.string().nullable().optional(),
});

type ClientFormSchemaType = z.infer<typeof clientFormSchema>;

export default function ClientRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ClientFormSchemaType>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientName: "",
      clientWhatsapp: "",
      clientEmail: "",
      clientSex: undefined,
      clientAge: undefined,
      currentDietPlanId: undefined,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      setIsLoading(true);

      try {
        const result = await createNewClient(data);
        setIsLoading(false);
        if ("error" in result) {
          toast.error(`Erro ao cadastrar cliente: ${result.error}`);
        } else {
          toast.success(`Cliente cadastrado com sucesso. ID: ${result.clientId}`);
          router.push(`/en/clients/${result.clientId}`);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Erro ao cadastrar cliente. Tente novamente.");
      }
    } else {
      toast.error(`Formulário inválido: ${JSON.stringify(form.formState.errors)}`);
    }
  };

  return (
    <div className="px-4 md:px-20 lg:px-32 md:max-w-[800px] mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Cadastro de Cliente</h2>
      <p className="text-muted-foreground font-light text-small md:text-lg text-center">Cadastre novos clientes</p>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="João Oliveira" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientWhatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whatsapp do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="+551199123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail do Cliente</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="cliente@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientSex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-6">
            <div className="flex-col flex space-y-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Cadastrar Cliente"}
              </Button>
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Voltar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
