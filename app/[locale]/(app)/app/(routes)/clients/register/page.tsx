"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "@/i18n/routing";
import { createNewClient2 } from "@/server-actions/client";
import { clientsFormSchema, ClientsFormSchemaType } from "@/types/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ClientRegistration() {
  // next safe action pattern
  const {
    execute: executeSave,
    isPending: isSaving,
    // result: saveResult,
    // reset: resetSaveAction,
  } = useAction(createNewClient2, {
    onSuccess({ data }) {
      toast.success(`Cliente cadastrado com sucesso. ID: ${data?.clientId}`);
      router.push(`/app/clients/${data?.clientId}`);
    },
    onError({ error }) {
      toast.error(`Erro ao cadastrar cliente`);
    },
  });

  const router = useRouter();

  const form = useForm<ClientsFormSchemaType>({
    resolver: zodResolver(clientsFormSchema),
    defaultValues: {
      clientName: "",
      clientWhatsapp: "",
      clientEmail: "",
      clientSex: undefined,
      clientAge: undefined,
      currentDietPlanId: undefined,
    },
  });

  const handleSubmit2 = async (data: ClientsFormSchemaType) => {
    executeSave(data);
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const isValid = await form.trigger();
  //   if (isValid) {
  //     const data = form.getValues();
  //     setIsLoading(true);

  //     try {
  //       const result = await createNewClient(data);
  //       setIsLoading(false);
  //       if ("error" in result) {
  //         toast.error(`Erro ao cadastrar cliente: ${result.error}`);
  //       } else {
  //         toast.success(`Cliente cadastrado com sucesso. ID: ${result.clientId}`);
  //         router.push(`/app/clients/${result.clientId}`);
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       toast.error("Erro ao cadastrar cliente. Tente novamente.");
  //     }
  //   } else {
  //     toast.error(`Formulário inválido: ${JSON.stringify(form.formState.errors)}`);
  //   }
  // };

  return (
    <div className="px-4 md:px-20 lg:px-32 md:max-w-[800px] mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Cadastro de Cliente</h2>
      <p className="text-muted-foreground font-light text-small md:text-lg text-center">Cadastre novos clientes</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit2)} className="space-y-6 mt-10">
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
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Cadastrando..." : "Cadastrar Cliente"}
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
