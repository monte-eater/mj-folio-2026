"use client";

interface TopBarProps {
  left: string;
  center?: string;
  right: string;
}

export default function TopBar({
  left,
  center = "DO NOT SCALE \u00B7 ALL DIMENSIONS IN PIXELS",
  right,
}: TopBarProps) {
  return (
    <div className="topbar">
      <span>{left}</span>
      <span>{center}</span>
      <span>{right}</span>
    </div>
  );
}
