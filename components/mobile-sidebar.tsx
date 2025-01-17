"use client";
import { Button } from "./ui/button";
import { Menu, XIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Sheet open={isOpen}>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu color="#4b5563" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-muted">
        <div className="flex justify-end mt-[2px]">
          <SheetClose className="absolute">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <XIcon color="#4b5563" />
            </Button>
          </SheetClose>
        </div>
        <Sidebar setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
