"use client";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DNA } from "react-loader-spinner";

export default function Home() {
  return (
    <div className="text-center mx-auto px-6 sm:px-20 w-full max-w-screen-lg">
      <div className="flex justify-center">
        <DNA
          visible={true}
          height="150"
          width="150" 
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      <div className="text-4xl sm:text-8xl font-bold">
        <span className="relative font-bold text-3xl text-white">
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-0 bottom-0 w-full h-4 sm:h-6 bg-gradient-to-r from-teal-700 to-blue-400"
            aria-hidden="true"
          ></span>
          <span className="z-2 relative text-6xl sm:text-8xl">Accessor</span>
        </span>
      </div>
      <div className="sm:w-1/2 mx-auto mt-5 text-sm sm:text-base">
      Accessor is a cutting-edge platform designed to help individuals and
          organizations manage their assets and resources efficiently. Whether you're
          looking to track personal items, manage business equipment, or streamline
          inventory management, Accessor provides a user-friendly interface to keep
          your valuable assets organized and easily accessible. With powerful features like real-time tracking, asset categorization,
          and secure sharing options, Accessor simplifies the management of physical
          and digital assets.
      </div>
      <div className="mt-5">
        <Link className={`${buttonVariants()} px-6 py-2 text-base sm:text-lg`} href="/log-in">
          {" "} Get Started {<ArrowRight />}
        </Link>
      </div>
    </div>
  );
}
