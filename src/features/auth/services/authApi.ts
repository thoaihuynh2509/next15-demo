"use server";

import { cookies } from "next/headers";

// Fake login API
export async function login(data: { email: string; password: string }) {
  if (data.email === "admin@example.com" && data.password === "123456") {
    const cookieStore = await cookies();
    cookieStore.set("token", "fake-jwt-token", {
      httpOnly: true,
      path: "/",
    });
    return { success: true };
  }
  return { success: false, message: "Invalid credentials" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true };
}
