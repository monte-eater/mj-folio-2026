import Image from "next/image";

interface HeroBlockProps {
  src?: string;
  alt: string;
}

export default function HeroBlock({ src, alt }: HeroBlockProps) {
  return (
    <div className="hero-block">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, 66vw"
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      ) : (
        <div className="img-placeholder" style={{ position: "absolute", inset: 0 }}>
          <span>Hero Image</span>
        </div>
      )}
    </div>
  );
}
