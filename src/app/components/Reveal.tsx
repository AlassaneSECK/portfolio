"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type AllowedTag = "div" | "section" | "article";

type RevealProps<T extends AllowedTag = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Composant Reveal pour animer l’apparition des blocs.
 */
export default function Reveal<T extends AllowedTag = "div">({
  as,
  children,
  className = "",
  delay = 0
}: RevealProps<T>) {
  const Tag = (as ?? "div") as AllowedTag;
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
  const canObserve = typeof window !== "undefined" && "IntersectionObserver" in window;
  const [visible, setVisible] = useState<boolean>(() => !canObserve);
  useEffect(() => {
    const element = ref.current;
    if (!element || !canObserve) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [canObserve]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`will-change-transform ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 [transition:none]"
      } transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </Tag>
  );
}
