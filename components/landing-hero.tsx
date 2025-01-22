"use client";

import { Link } from "@/i18n/routing";
import { useAuth } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import TypewriterComponent from "typewriter-effect";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  const t = useTranslations("Homepage");

  return (
    <div className="bg-white">
      <div className="p-2 shadow-lg m-4 text-white font-bold py-5 md:py-30 text-center space-y-5 bg-secondary rounded-[40px]">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold text-gray-500">
          <h1>{t("mainTitle")}</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-emerald-600">
            <TypewriterComponent
              options={{
                strings: [t("typewriter.habit"), t("typewriter.lifestyle"), t("typewriter.routine")],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm md:text-xl font-medium text-zinc-400">{t("subtitle")}</div>
        <div>
          <Link href={isSignedIn ? "/app/dashboard" : "/sign-up"}>
            <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
              {t("cta")}
            </Button>
          </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">{t("bottomText")}</div>
        <div className="mx-auto">
          {/* <Image width={250} height={500} alt="gif" src="/gif.gif" className="mx-auto rounded-md" /> */}
        </div>
      </div>
    </div>
  );
};
