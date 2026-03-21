"use client";

import { useEffect, useState } from "react";

export default function BackToTopFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`fab-top-wrapper ${visible ? "visible" : ""}`}>
      <button className="fab-top" onClick={handleClick} title="Back to top">
        <span>Back to Top</span>
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <path
            d="M11 33V1M1 11L11 1L21 11"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
