"use client";

import { routes } from "@/config/route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../client/ThemeToggle";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default function Navbar({ isAuthenticated = true }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-bold text-xl">MyApp</span>
        <ThemeToggle />
      </div>

      {
        isAuthenticated && (
          <ul className="flex gap-6">
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
          </ul>
        )
      }


      {
        isAuthenticated && (
          <LogoutButton />
        )
      }
    </nav>
  );
}
