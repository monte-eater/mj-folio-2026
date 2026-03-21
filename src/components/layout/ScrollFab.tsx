"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollFabProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollFab({ targetRef }: ScrollFabProps) {
  const fabRef = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const handleScroll = () => {
      setHidden(el.scrollTop > 0);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  useEffect(() => {
    function centerFab() {
      const el = targetRef.current;
      const fab = fabRef.current;
      if (!el || !fab) return;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      fab.style.left = Math.round(center - fab.offsetWidth / 2) + "px";
    }

    centerFab();
    window.addEventListener("resize", centerFab);
    return () => window.removeEventListener("resize", centerFab);
  }, [targetRef]);

  const handleClick = () => {
    targetRef.current?.scrollBy({ top: 400, behavior: "smooth" });
  };

  return (
    <button
      ref={fabRef}
      className={`scroll-fab ${hidden ? "hidden" : ""}`}
      onClick={handleClick}
      title="Scroll down"
      aria-label="Scroll down"
    >
      <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
        <path
          d="M11 1v32M1 23l10 10 10-10"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
