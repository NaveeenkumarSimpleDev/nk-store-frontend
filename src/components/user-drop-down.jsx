import { CreditCard, Keyboard, LogOut, Settings, User } from "lucide-react";

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
export function UserDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-10 w-10 cursor-pointer rounded-full bg-black "></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-white px-4 py-2 mt-2 mr-4">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-lg font-bold">Naveenkumar</span>
            <span className=" ml-1">NN@gmail.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
            <User className="mr-4 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
            <CreditCard className="mr-4 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
            <Settings className="mr-4 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
            <Keyboard className="mr-4 h-4 w-4" />
            <span>Keyboard</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm cursor-pointer hover:bg-gray-200">
          <LogOut className="mr-4 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
