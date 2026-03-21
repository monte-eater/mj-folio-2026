import Image from "next/image";

interface ImgGrid3Item {
  src?: string;
  alt: string;
  caption?: string;
}

interface ImgGrid3Props {
  items: ImgGrid3Item[];
  stack?: boolean;
}

export default function ImgGrid3({ items, stack }: ImgGrid3Props) {
  const visible = items.filter((item) => item.src);
  if (visible.length === 0) return null;
  return (
    <div className={stack ? "img-stack" : "img-grid-3"}>
      {visible.map((item, i) => (
        <div key={i}>
          <Image
            src={item.src!}
            alt={item.alt}
            width={400}
            height={300}
            style={{ width: "100%", height: "auto", border: "1px solid rgba(37,37,37,0.12)" }}
          />
          {item.caption && <div className="img-caption">{item.caption}</div>}
        </div>
      ))}
    </div>
  );
}
