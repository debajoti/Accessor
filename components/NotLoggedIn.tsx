"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotLoggedIn() {
  const handleLoginRedirect = () => {
    window.location.href = "/log-in";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-center text-white">
      <div className="max-w-md bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="mb-2">
          <Image
            src="/nlg.png"
            height={200}
            width={200}
            alt="Not Logged In"
            className="w-44 h-44 mx-auto"
          />
        </div>
        <h1 className="text-2xl font-semibold text-gray-50 mb-2">
          You're not logged in!
        </h1>
        <p className="text-gray-200 mb-4">
          Please sign in to access your account and continue using the app.
        </p>
        <Button
          onClick={handleLoginRedirect}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}
