import * as React from "react";
import { useSelector } from "react-redux";

import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { CATEGORIES } from "../config";

export function NavigationLinks() {
  const user = useSelector(selectLoggedInUser);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "font-semibold text-sm mr-2",
              navigationMenuTriggerStyle
            )}
          >
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {CATEGORIES.map((category) => (
                <Link to={category.href}>
                  <ListItem key={category.title} title={category.title}>
                    {category.description}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {user?.role === "admin" && (
          <NavigationMenuItem>
            {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className="font-semibold text-sm mr-4 hover:underline transition-all">
              <Link to={"/admin"}>Dashboard</Link>
            </NavigationMenuLink>
            {/* </Link> */}
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
          <NavigationMenuLink className="font-semibold text-sm mr-2">
            <Link to={"/products"}>Products</Link>
          </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-md font-bold leading-none">{title}</div>
            <p className="line-clamp-2 text-sm font-medium leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
