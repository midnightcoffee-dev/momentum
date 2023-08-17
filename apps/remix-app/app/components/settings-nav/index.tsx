"use client";

import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

export function SidebarNav() {
  const { pathname } = useLocation();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.to
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    to: "/profile",
  },
  {
    title: "Account",
    to: "/account",
  },
  // {
  //   title: "Appearance",
  //   to: "/appearance",
  // },
  {
    title: "Notifications",
    to: "/notifications",
  },
  // {
  //   title: "Display",
  //   to: "/display",
  // },
];
