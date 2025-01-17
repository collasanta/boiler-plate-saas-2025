"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Link, redirect } from "@/i18n/routing";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    redirect("/dashboard");
  }

  return (
    <nav className="p-4 bg-white flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative w-16 h-16">
          <Image fill alt="Logo" src="/logo.png" className="rounded-lg" />
        </div>
        <h1
          className={cn(
            "pl-4 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400",
            font.className
          )}
        >
          Diário.Fit
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full text-gray-500">
            Entrar
          </Button>
        </Link>
      </div>
    </nav>
  );
};
