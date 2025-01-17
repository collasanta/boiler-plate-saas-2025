import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp
    appearance={{
      elements: {
        formButtonPrimary:
          "bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-400 text-white border-0",
        logoBox:"w-[100px] h-[100px] mx-auto",
        logoPlacement: "outside",
      },
    }}
  />;
}