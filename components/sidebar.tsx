"use client";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { BotMessageSquare, Settings, UserRoundPlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const Sidebar = ({
  setIsOpen = () => {
    null;
  },
}: {
  setIsOpen?: any;
}) => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  // Helper function to check if a route is active by matching after /app/
  const isRouteActive = (routePath: string) => {
    const appPathIndex = pathname.indexOf("/app/");
    if (appPathIndex === -1) return false;

    const currentAppPath = pathname.slice(appPathIndex);
    return currentAppPath.startsWith(routePath);
  };

  const routes = [
    {
      label: t("dashboard"),
      icon: BotMessageSquare,
      href: "/app/dashboard",
      color: "text-emerald-500",
    },
    {
      label: t("profiles.main"),
      icon: Users,
      href: "/app/clients",
      color: "text-emerald-500",
      subitems: [
        {
          label: t("profiles.addNew"),
          icon: UserRoundPlus,
          href: "/app/clients/register",
          color: "text-emerald-500",
        },
      ],
    },
    {
      label: t("settings"),
      icon: Settings,
      href: "/app/settings",
      color: "text-emerald-500",
    },
  ];
  return (
    <>
      <div className="space-y-4 py-4 flex flex-col h-full bg-secondary text-white">
        <div className="px-3 py-2 flex-1">
          <Link href="/app/dashboard" className="flex items-center mx-auto mb-10">
            <div className="relative w-[80px] h-[80px] bg-white rounded-full">
              <Image src="/logo.png" fill alt="logo" className="rounded-lg shadow-lg" />
            </div>
            <h1
              className={cn(
                "pl-4 font-extrabold text-transparent text-[23px] bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400",
                font.className
              )}
            >
              Inteli.Fit
            </h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <div key={route.href}>
                <Link
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-muted rounded-lg transition hover:text-white hover:bg-emerald-500",
                    isRouteActive(route.href) ? "text-white bg-emerald-500" : "text-gray-600"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon
                      className={cn(
                        "w-5 h-5 mr-3",
                        isRouteActive(route.href) ? "text-white" : route.color,
                        "group-hover:text-white"
                      )}
                    />
                    {route.label}
                  </div>
                </Link>
                {isRouteActive(route.href) &&
                  route.subitems &&
                  route.subitems.map((subitem) => (
                    <Link
                      href={subitem.href}
                      onClick={() => setIsOpen(false)}
                      key={subitem.href}
                      className={cn(
                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition text-gray-600",
                        isRouteActive(subitem.href) && "bg-emerald-100",
                        "w-[95%] ml-auto hover:bg-emerald-100"
                      )}
                    >
                      <div className="flex items-center flex-1">
                        <subitem.icon
                          className={cn("w-5 h-5 mr-3", isRouteActive(subitem.href) ? "text-emerald-500" : subitem.color)}
                        />
                        {subitem.label}
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
