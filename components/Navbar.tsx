import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignoutButton from "./SignoutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="text-josefin bg-transparent fixed w-full z-10 top-0 p-5 px-10">
      <div className="container flex items-center justify-between mx-auto">
        <div>    
        <span className="relative font-bold text-3xl text-white">
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1 bottom-0 w-full h-2 bg-blue-500"
            aria-hidden="true"
          ></span>
          <span className="z-2 relative">VRV</span>
        </span>
        </div>
        {session?.user ? (
          <SignoutButton/>
        ) : (
          <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/sign-up"
          >
            Sign up
          </Link>
          <Link className={buttonVariants({ variant: "default" })} href="/log-in">
            Log in
          </Link>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
