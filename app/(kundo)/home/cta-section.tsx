"use client";

import Link from "next/link";
import { Button } from "~/components/button";
import * as Typography from "~/components/typography";

export default function CTASection() {
  return (
    <section className="relative z-[1] w-full min-h-screen overflow-hidden bg-black -mt-[120px]">
      {/* Background image — masked with radial gradient so edges blend into black */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/cta-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 60%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 60%, black 30%, transparent 70%)",
        }}
      />

      {/* Gradient mask overlay — flipped: black top → transparent bottom */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: "-36px",
          background:
            "linear-gradient(180deg, #000 35.62%, rgba(0, 0, 0, 0.00) 59.62%)",
          filter: "blur(36px)",
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="max-w-[1008px] mx-auto text-center">
          <Typography.H2>
            {"Let\u2019s build what\u2019s next,"}
            <br />
            {"together."}
          </Typography.H2>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link href="mailto:hello@kundo.studio">
              <Button className="w-[168px] h-12">Get in touch</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
