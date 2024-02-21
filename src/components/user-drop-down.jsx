import React from "react";
import {
  CreditCard,
  Heart,
  LogOut,
  User,
  ShoppingCartIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "../feautures/auth/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../feautures/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndigator from "./loading-indicator";

const UserDropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-10 w-10 cursor-pointer rounded-full bg-black "></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-white px-4 py-2 mt-2 mr-4">
        {user ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-lg font-bold">{user?.name}</span>
                <span className=" ml-1">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
                <User className="mr-4 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <Link to="/orders">
                <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
                  <CreditCard className="mr-4 h-4 w-4" />
                  <span>My Orders</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link to="/favourites">
                <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
                  <Heart className="mr-4 h-4 w-4" />
                  Favorites
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link to="/products">
                <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
                  <ShoppingCartIcon className="mr-4 h-4 w-4" />
                  Products
                  <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout(dispatch, navigate)}
              className="text-sm cursor-pointer hover:bg-gray-200"
            >
              <LogOut className="mr-4 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="h-4 w-full flex items-center justify-center">
            {/* Style this loading UI */}
            <LoadingIndigator />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(UserDropdownMenu);
