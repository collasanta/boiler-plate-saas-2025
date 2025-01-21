import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ModalProvider } from "@/components/model-provider";
import ToasterProvider from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";
import GoogleAnalytics from "@/components/google-analytics";
import { Analytics } from "@vercel/analytics/react";
import { ptBR, enUS } from "@clerk/localizations";
import { Suspense } from "react";
import Loading from "./loading";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inteli.Fit",
  description: "Dietas e Treinos personalizados de forma fácil",
  // manifest: '/manifest.json',
  icons: { apple: "/icon.png" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Diário.Fit",
    startupImage: [
      {
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
        url: "/iphone5_splash.png",
      },
      {
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
        url: "/iphone6_splash.png",
      },
      {
        media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)",
        url: "/iphoneplus_splash.png",
      },
      {
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
        url: "/iphonex_splash.png",
      },
      {
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
        url: "/iphonexr_splash.png",
      },
      {
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
        url: "/iphonexsmax_splash.png",
      },
      {
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
        url: "/ipadpro1_splash.png",
      },
      {
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
        url: "/ipadpro3_splash.png",
      },
      {
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
        url: "/ipadpro2_splash.png",
      },
    ],
  },
  // themeColor: "#f1f5f9",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const clerkLocale = locale === "pt" ? ptBR : enUS;

  return (
    <NextIntlClientProvider messages={messages}>
      <ClerkProvider localization={clerkLocale}>
        <html lang={locale} suppressHydrationWarning={true}>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID!} />
          <CrispProvider />
          <body className={inter.className} suppressHydrationWarning={true}>
            <Suspense fallback={<Loading />}>
              <ModalProvider />
              <ToasterProvider />
              {children}
              <Analytics />
            </Suspense>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
