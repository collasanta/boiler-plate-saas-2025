import { UserButton } from "@clerk/nextjs";
import LocaleSwitcher from "./locale-switcher";
import MobileSidebar from "./mobile-sidebar";

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end min-h-[33px] space-x-4">
        <LocaleSwitcher />
        <UserButton />
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
