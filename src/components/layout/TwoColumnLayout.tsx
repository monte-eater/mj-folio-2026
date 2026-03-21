"use client";

import { useRef } from "react";
import ScrollFab from "./ScrollFab";
import BackToTopFab from "./BackToTopFab";

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  showScrollFab?: boolean;
}

export default function TwoColumnLayout({
  left,
  right,
  showScrollFab = true,
}: TwoColumnLayoutProps) {
  const rightColRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="page-wrapper">
        <div className="columns">
          <div className="col col-left" id="col-left">
            {left}
          </div>
          <div
            className="col col-right"
            id="col-right"
            ref={rightColRef}
          >
            {right}
          </div>
        </div>
      </div>
      {showScrollFab && <ScrollFab targetRef={rightColRef} />}
      <BackToTopFab />
    </>
  );
}
