"use client";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import Link from "next/link";
import { DNA } from "react-loader-spinner";

export default function Home() {
  return (
    <div className="text-center mx-auto px-20">
      <div className="flex justify-center">
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      <div className="text-8xl font-bold">
        <span className="relative font-bold text-3xl text-white">
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-0 bottom-0 w-full h-6 bg-gradient-to-r from-teal-700 to-blue-400"
            aria-hidden="true"
          ></span>
          <span className="z-2 relative text-8xl">Accessor</span>
        </span>
      </div>
      <div className="sm:w-1/2 mx-auto mt-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat,
        perspiciatis beatae tempora molestiae incidunt, quisquam, laudantium
        dolorem delectus pariatur nostrum maxime! Recusandae itaque voluptatibus
        culpa optio tenetur? Dolorum, delectus consequuntur. Molestias
        repudiandae ipsa quidem dolorum sit aperiam error odio, molestiae dolor
        alias consequuntur aliquid sunt architecto doloremque ullam laboriosam
        eos ab eum possimus, neque nihil accusamus ea consectetur harum? Animi
        ullam alias officia delectus, inventore veniam, at eos ipsam vitae
        architecto mollitia nisi.
      </div>
      <div className="mt-5">
        <Link className={buttonVariants()} href="/log-in">
          {" "}
          Get Started {<ArrowRight />}
        </Link>
      </div>
    </div>
  );
}
