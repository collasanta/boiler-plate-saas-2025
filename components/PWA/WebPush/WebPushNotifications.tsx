'use client'

import {
  saveWebPushSubscription
} from "@/lib/pwa"
import { MouseEventHandler, useEffect, useState } from "react"
import { MdOutlineNotificationAdd } from "react-icons/md";

const base64ToUint8Array = (base64: string) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function Notifications({ programId }: { programId: string }) {
  const [open, setOpen] = useState<boolean>(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          setRegistration(reg);
          if (!(window.Notification && navigator.serviceWorker && window.PushManager)) {
              console.log("notifications not supported")
            } else if (Notification.permission === 'denied') {
              console.log("notifications denied")
            } else if (Notification.permission === 'granted') {
              console.log("notifications granted")
            } else {
              console.log("show enable notifications")
              setOpen(true)
            }
        });
      });
    }
  }, []);

  const subscribeButtonOnClick: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (!registration) {
      console.error("No SW registration available.");
      setOpen(false)
      return;
    }
    try {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      saveWebPushSubscription(JSON.stringify(sub), programId, window.navigator.userAgent!)
      setOpen(false)
    } catch (error) {
      setOpen(false)      
    }
  };

  return (
    <>
    {
    open &&
    <button onClick={subscribeButtonOnClick}>
      <MdOutlineNotificationAdd className="w-5 h-5 align-bottom mt-1 animate-wiggle" color="#10B77F" />
    </button>
    }
      {/* <AlertDialog open={open}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Bem vindo ao seu Diário.Fit 🎉</AlertDialogTitle>
            <AlertDialogDescription className="py-2">
              Para prosseguir, ative as notificações clicando no botão abaixo👇
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter> */}
            {/* <AlertDialogAction className="mx-20"> */}
            {/* <button className='w-[150px] h-[50px] mx-auto hinline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#059669] ' onClick={subscribeButtonOnClick}>
              Ativar Notificações
            </button> */}
            {/* </AlertDialogAction> */}
          {/* </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  )
}