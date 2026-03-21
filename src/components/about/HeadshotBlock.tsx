"use client";

import Image from "next/image";

interface HeadshotBlockProps {
  src?: string;
}

export default function HeadshotBlock({ src }: HeadshotBlockProps) {
  return (
    <div className="headshot-block">
      {src ? (
        <Image
          src={src}
          alt="Montague Joachim"
          width={500}
          height={500}
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            maxHeight: 350,
            height: "auto",
            objectFit: "cover",
            objectPosition: "center 40%",
            display: "block",
            filter: "grayscale(100%)",
            transition: "filter .4s ease",
          }}
          className="headshot-img"
          priority
        />
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            maxHeight: 350,
            background: "#ebebeb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "rgba(37,37,37,0.35)",
            textTransform: "uppercase",
          }}
        >
          Profile Photo
        </div>
      )}
    </div>
  );
}
