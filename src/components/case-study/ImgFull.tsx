import Image from "next/image";

interface ImgFullProps {
  src?: string;
  alt?: string;
  caption?: string;
}

export default function ImgFull({ src, alt, caption }: ImgFullProps) {
  if (!src) return null;
  return (
    <div className="img-full">
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={600}
        sizes="(max-width: 1024px) 100vw, 65vw"
        style={{ width: "100%", height: "auto" }}
      />
      {caption && <div className="img-caption">{caption}</div>}
    </div>
  );
}
