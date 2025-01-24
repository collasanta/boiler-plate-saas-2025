"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "@/i18n/routing";
import { createNewClient2 } from "@/server-actions/client";
import { clientsFormSchema, ClientsFormSchemaType } from "@/types/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ClientRegistration() {
  const t = useTranslations("Clients.registration");
  const router = useRouter();

  const { execute: executeSave, isPending: isSaving } = useAction(createNewClient2, {
    onSuccess({ data }) {
      toast.success(t("success") + data?.clientId);
      router.push(`/app/clients/${data?.clientId}`);
    },
    onError({ error }) {
      toast.error(t("error") + error.serverError);
    },
  });

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

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = form.getValues();
    executeSave(formData);
  };

  return (
    <div className="px-4 md:px-20 lg:px-32 md:max-w-[800px] mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{t("title")}</h2>
      <p className="text-muted-foreground font-light text-small md:text-lg text-center">{t("subtitle")}</p>
      <Form {...form}>
        <form onSubmit={handleSubmit2} className="space-y-6 mt-10">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.fullName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.fullNamePlaceholder")} {...field} />
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
                <FormLabel>{t("form.whatsapp")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.whatsappPlaceholder")} {...field} />
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
                <FormLabel>{t("form.email")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t("form.emailPlaceholder")} {...field} />
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
                <FormLabel>{t("form.gender")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("form.genderPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="masculino">{t("form.male")}</SelectItem>
                    <SelectItem value="feminino">{t("form.female")}</SelectItem>
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
                <FormLabel>{t("form.age")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t("form.agePlaceholder")}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-6">
            <div className="flex-col flex space-y-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? t("form.submitting") : t("form.submit")}
              </Button>
              <Button variant="outline" type="button" onClick={() => router.back()}>
                {t("form.back")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
