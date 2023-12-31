import React from "react";
import { X } from "lucide-react";
import logo from "/logo.tr.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

const MobileNavbar = ({ isOpen, setOpen }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className={cn(
            " z-[100] fixed top-0 min-h-screen min-w-full bg-[rgba(0,0,0,0.1)]"
          )}
        />
      )}
      <section
        className={cn(
          "min-w-[300px] z-[110] transition-all duration-200 fixed top-0 left-0 h-full bg-white",
          isOpen ? "clip-inset-100" : "clip-inset-0"
        )}
      >
        <div className="flex items-center justify-between px-3 py-4">
          <Link onClick={() => setOpen(false)} to="/">
            <img src={logo} height={120} width={170} alt="Logo" />
          </Link>
          <div
            onClick={() => setOpen(false)}
            className="hover:bg-gray-100 p-2 flex items-center justify-center cursor-pointer absolute top-2 right-2 rounded-full"
          >
            <X strokeWidth={3} size={20} />
          </div>
        </div>

        {/* nav links */}
        <div className=" p-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                Navigation Links
              </AccordionTrigger>
              <AccordionContent>
                <div className=" ml-2 flex flex-col gap-2 text-sm font-medium">
                  <a>Link1</a>
                  <a>Link1</a>
                  <a>Link1</a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default React.memo(MobileNavbar);
