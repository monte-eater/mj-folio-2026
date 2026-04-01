import Image from "next/image";

interface ImgGrid2Item {
  src?: string;
  alt: string;
  caption?: string;
}

interface ImgGrid2Props {
  items: ImgGrid2Item[];
  stack?: boolean;
}

export default function ImgGrid2({ items, stack }: ImgGrid2Props) {
  const visible = items.filter((item) => item.src);
  if (visible.length === 0) return null;
  return (
    <div className={stack ? "img-stack" : "img-grid-2"}>
      {visible.map((item, i) => (
        <div key={i}>
          <Image
            src={item.src!}
            alt={item.alt}
            width={1200}
            height={800}
            sizes={stack ? "(max-width: 1024px) 100vw, 65vw" : "(max-width: 768px) 100vw, 32vw"}
            style={{ width: "100%", height: "auto", border: "1px solid rgba(37,37,37,0.12)" }}
          />
          {item.caption && <div className="img-caption">{item.caption}</div>}
        </div>
      ))}
    </div>
  );
}
