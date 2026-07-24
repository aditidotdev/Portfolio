"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { CONTACT } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConnectLinkCard } from "./ConnectLinkCard";
import {
  fadeUpItem,
  staggerContainer,
  staticFadeUpItem,
  staticStaggerContainer,
} from "@/lib/motionVariants";

export function ConnectSection() {
  const reducedMotion = useReducedMotion();
  const contentMotionVariants = reducedMotion
    ? staticStaggerContainer
    : staggerContainer(0.1, 0.15);
  const itemVariants = reducedMotion ? staticFadeUpItem : fadeUpItem;

  return (
    <section
      id="contact"
      className="relative scroll-mt-4 pt-14 pb-56 md:scroll-mt-8 md:pt-16 md:pb-60"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
        <SectionHeader
          heading={CONTACT.heading}
          headingAccent={CONTACT.headingAccent}
        />

        <motion.div
          variants={contentMotionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-60px" }}
          className="mt-8 flex flex-col items-center md:mt-10"
        >
          <motion.div variants={itemVariants}>
            <Button href={`mailto:${CONTACT.email}`} variant="primary">
              <HiOutlineMail className="mr-2 h-4 w-4" aria-hidden="true" />
              Send me an email
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 flex items-center gap-2 text-sm text-white"
          >
            <HiOutlineLocationMarker
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            {CONTACT.location}
          </motion.p>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {CONTACT.links.map((link) => (
              <ConnectLinkCard key={link.id} link={link} variants={itemVariants} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
