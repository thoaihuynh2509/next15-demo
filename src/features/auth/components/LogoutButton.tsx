"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../services/authApi";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      await logout();
      router.push("/login");
    });
  }



  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
