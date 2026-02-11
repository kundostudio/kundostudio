"use client";

import * as Typography from "~/components/typography";

export default function CTASection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black -mt-[120px]">
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
        className="absolute"
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
          <Typography.H1>
            {"Let\u2019s build what\u2019s next,"}
            <br />
            {"together."}
          </Typography.H1>

          <div className="mt-8 sm:mt-10">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-16 sm:px-24 py-4 text-base font-medium text-white/70 transition-all hover:text-white border border-white/10 backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
              }}
            >
              Book an intro call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
