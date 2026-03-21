"use client";

import { useEffect, useRef } from "react";

export default function NameBlock() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function fitH1() {
      const h1 = h1Ref.current;
      const container = containerRef.current;
      if (!h1 || !container) return;

      const availableWidth = container.clientWidth;
      const lines = ["Montague", "Joachim: P-26"];
      const tester = document.createElement("span");
      tester.style.cssText =
        "position:absolute;visibility:hidden;white-space:nowrap;font-family:Manrope,sans-serif;font-weight:800;letter-spacing:-0.03em;font-size:100px;";
      document.body.appendChild(tester);

      let maxWidth = 0;
      lines.forEach((line) => {
        tester.textContent = line;
        maxWidth = Math.max(maxWidth, tester.offsetWidth);
      });
      document.body.removeChild(tester);

      const scaledSize = Math.floor((availableWidth / maxWidth) * 100);
      const clamped = Math.min(Math.max(scaledSize, 20), 120);
      h1.style.fontSize = clamped + "px";
      h1.style.lineHeight = "1.0";
    }

    document.fonts.ready.then(fitH1);
    window.addEventListener("resize", fitH1);
    return () => window.removeEventListener("resize", fitH1);
  }, []);

  return (
    <div className="name-block" ref={containerRef}>
      <div
        style={{
          alignSelf: "stretch",
          paddingBottom: 16,
        }}
      >
        <h1
          ref={h1Ref}
          style={{
            color: "#252525",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            fontSize: "clamp(22px, 6.8vw, 105px)",
          }}
        >
          Montague
          <br />
          Joachim: P-26
        </h1>
      </div>
    </div>
  );
}
