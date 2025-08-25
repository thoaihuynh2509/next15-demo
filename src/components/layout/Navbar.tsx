"use client";

import { routes } from "@/config/route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../client/ThemeToggle";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar({ isAuthenticated = true }) {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image src="/globe.svg" alt="Logo" width={50} height={50} />
        </div>
      </Link>

      <ul className="flex items-center gap-8">
        {routes.map((route) => {
          const isActive = pathname === route.path;
          return (
            <li key={route.path}>
              <Link
                href={route.path}
                className={`${isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                  } hover:text-blue-500 transition-colors`}
              >
                {route.name}
              </Link>
            </li>
          );
        })}

        {
          isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Button variant="default" className="ml-auto bg-blue-600 text-white min-w-20">Login</Button>
          )
        }
      </ul>


    </nav>
  );
}
