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
import { Link, NavLink } from "react-router-dom";
import { CATEGORIES } from "../../config";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";

const MobileNavbar = ({ isOpen, setOpen }) => {
  const user = useSelector(selectLoggedInUser);

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
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <div className="ml-2 flex flex-col gap-2 text-sm font-medium">
                  {CATEGORIES.map((cat) => (
                    <NavLink
                      onClick={() => setOpen(false)}
                      end
                      key={cat.description}
                      className={({ isActive }) =>
                        cn(
                          "p-2 hover:bg-gray-300 rounded font-semibold",
                          isActive && "bg-gray-300"
                        )
                      }
                      to={cat.href}
                    >
                      {cat.title}
                    </NavLink>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="grid my-4 gap-3">
            {user?.role === "admin" && (
              <NavLink
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "p-2 hover:bg-gray-300 rounded font-semibold",
                    isActive && "bg-gray-300"
                  )
                }
                to={"/admin/products"}
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "p-2 hover:bg-gray-300 rounded font-semibold",
                  isActive && "bg-gray-300"
                )
              }
              to={"/products"}
            >
              Products
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(MobileNavbar);
