"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex mt-20 items-center justify-center ">
      <SignIn appearance={{
        elements: {
          formButtonPrimary:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg",
          card: "shadow-lg p-6 border border-gray-200 rounded-xl",
        }
      }}
        path="/login"
        routing="path"
      />
    </div>
  );
}