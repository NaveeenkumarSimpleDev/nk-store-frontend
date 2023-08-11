import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import Search from "../search";
import UserDropdownMenu from "../user-drop-down";
import logo from "/logo.tr.png";
import { NavigationLinks } from "../navigation-liks";
import MobileMenu from "./mobile-menu";
import { useState } from "react";
import Cart from "../../pages/cart-page";
import { useSelector } from "react-redux";
import { selectCart } from "../../feautures/cart/cartSlice";
import { selectLoggedInUser } from "../../feautures/auth/authSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useSelector(selectCart);
  const loggedInUser = useSelector(selectLoggedInUser);

  return (
    <>
      <nav className="flex-shrink-0 fixed z-[100] bg-white top-0 left-0 right-0 w-[100vw] h-16 2xl:h-20 border-b border-gray-200 shadow-sm lg:px-8 px-6 py-4 flex items-center gap-4 lg:gap-6 xl:gap-12">
        {/* Logo for xl devices */}
        <div className=" hidden lg:block ">
          <Link to="/">
            <img src={logo} height={150} width={150} alt="Logo" />
          </Link>
        </div>

        {/* menu icon for small devices */}
        <div
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden cursor-pointer"
        >
          <Menu strokeWidth={3} size={28} />
        </div>

        {/* Navigation menu links */}
        <div className="hidden lg:block">
          <NavigationLinks />
        </div>

        {/* common nav components */}
        <div className="ml-auto flex gap-3 lg:gap-4 items-center">
          <Search />

          <div
            onClick={() => setCartOpen(true)}
            className="border cursor-pointer relative py-2 transition delay-100 ease-in-out px-3 hover:bg-accent rounded-md flex  items-center"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-3 -right-3 rounded-full px-3 flex items-center justify-center font-bold py-1 bg-black text-white">
              <span>
                {cart?.cartItems?.length || (cart?.statu !== "loading" && 0)}
              </span>
            </span>
          </div>
          {loggedInUser ? (
            <UserDropdownMenu />
          ) : (
            <Link to="/login">
              <div className="border py-1.5 px-2.5 bg-black text-white  hover:bg-white hover:text-black rounded-md transition flex  items-center">
                <span className=" font-semibold text-md ">LOGIN</span>
              </div>
            </Link>
          )}
        </div>
      </nav>

      {/* mobile nav Links */}
      <div>
        <MobileMenu setOpen={setMobileMenuOpen} isOpen={mobileMenuOpen} />
      </div>

      <div className="">
        <Cart isOpen={cartOpen} setIsOpen={setCartOpen} />
      </div>
    </>
  );
};

export default Navbar;
