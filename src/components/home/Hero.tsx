"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import heroImg from "../../../public/images/hero-ai.webp";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-body">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-secondary/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 sm:px-8 lg:flex-row lg:gap-16 lg:py-28">
        <div className="flex max-w-xl flex-col items-start gap-7 lg:max-w-130">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="group relative inline-flex rounded-full p-px shadow-lg shadow-primary/5">
              <span className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
                <span
                  className="absolute inset-[-200%] animate-border-beam"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, transparent 70%, var(--primary) 80%, var(--accent) 90%, transparent 100%)",
                  }}
                />
              </span>

              <span
                className="
                  relative z-10 inline-flex items-center gap-2
                  rounded-full bg-body px-4 py-1.5
                  text-sm font-medium text-primary
                "
                style={{ boxShadow: "inset 0 0 12px var(--glow)" }}
              >
                <HiOutlineSparkles className="text-accent" size={16} />
                Learn AI. Build with AI.
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            From{" "}
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Concepts
            </span>
            <br />
            to{" "}
            <span className="bg-linear-to-r from-secondary to-highlight bg-clip-text text-transparent">
              Real Projects.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-base leading-relaxed text-text-muted sm:text-lg"
          >
            Explore AI concepts through handwritten notes, practical assignments, and AI-powered
            projects from the course{" "}
            <a
              href="https://namastedev.com/learn/namaste-ai?_aff=946684804112"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent no-underline transition-all duration-300 hover:underline hover:decoration-accent/60 hover:underline-offset-2"
            >
              Namaste AI
            </a>{" "}
            course by Akshay Saini ·{" "}
            <a
              href="https://namastedev.com?_aff=946684804112"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-highlight no-underline transition-all duration-300 hover:underline hover:decoration-highlight/60 hover:underline-offset-2"
            >
              NamasteDev
            </a>
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/notes"
              className="
                group inline-flex items-center gap-2
                rounded-xl bg-linear-to-r from-highlight via-secondary to-primary
                px-6 py-3 text-sm font-semibold text-white
                shadow-lg shadow-highlight/25
                transition-all duration-300
                hover:shadow-xl hover:shadow-highlight/30
                hover:brightness-110
              "
            >
              Explore Notes
              <FiArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#projects"
              className="
                group inline-flex items-center gap-2
                rounded-xl border border-border
                bg-surface/60 px-6 py-3
                text-sm font-semibold text-text
                backdrop-blur-sm
                transition-all duration-300
                hover:border-primary/50 hover:bg-surface-hover
                hover:shadow-lg hover:shadow-primary/10
              "
            >
              <AiOutlineFundProjectionScreen
                size={16}
                className="text-text-muted transition-colors duration-300 group-hover:text-primary"
              />
              View Projects
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.3 }}
          className="relative flex w-full max-w-lg items-center justify-center lg:max-w-none lg:flex-1"
        >
          <div
            className="
              absolute inset-0 -m-4
              rounded-3xl
              bg-linear-to-br from-primary/15 via-secondary/10 to-highlight/15
              blur-2xl
            "
          />

          <div
            className="
              relative overflow-hidden
              rounded-2xl border border-border
              bg-surface shadow-2xl shadow-black/30
            "
          >
            <Image
              src={heroImg}
              alt="AI robot studying handwritten notes – representing the Namaste AI learning journey"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-surface/80 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
