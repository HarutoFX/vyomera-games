"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  tooltipPosition = "bottom",
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  tooltipPosition?: "top" | "bottom";
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        tooltipPosition={tooltipPosition}
      />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-0 top-full mt-2 flex flex-col gap-2 z-50"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/90 text-white shadow-lg backdrop-blur-md"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/90 text-white shadow-lg backdrop-blur-md"
        aria-label="Toggle navigation dock"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  tooltipPosition = "bottom",
}: {
  items: FloatingDockItem[];
  className?: string;
  tooltipPosition?: "top" | "bottom";
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-14 items-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/70 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          tooltipPosition={tooltipPosition}
          {...item}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  tooltipPosition = "bottom",
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  tooltipPosition?: "top" | "bottom";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex aspect-square items-center justify-center rounded-full border border-white/10 bg-neutral-900/90 text-red-400 shadow-md backdrop-blur-md transition-colors hover:border-red-500/50 hover:text-red-400"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: tooltipPosition === "top" ? 8 : -8,
                x: "-50%",
              }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{
                opacity: 0,
                y: tooltipPosition === "top" ? 4 : -4,
                x: "-50%",
              }}
              className={cn(
                "absolute left-1/2 -translate-x-1/2 whitespace-pre rounded-md border border-red-500/20 bg-neutral-950/95 px-2.5 py-0.5 text-xs font-medium text-red-400 shadow-xl backdrop-blur-md z-50",
                tooltipPosition === "top" ? "-top-8" : "-bottom-8"
              )}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
