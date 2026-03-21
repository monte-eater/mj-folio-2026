import Image from "next/image";

interface ProductVariant {
  name: string;
  detail: string;
  image?: string;
}

interface ProductRangeProps {
  variants: ProductVariant[];
  caption?: string;
}

export default function ProductRange({ variants, caption }: ProductRangeProps) {
  return (
    <>
      <div className="product-range">
        {variants.map((v, i) => (
          <div key={i} className="product-range-item">
            {v.image && (
              <Image
                src={v.image}
                alt={v.name}
                width={400}
                height={200}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
            <div className="product-range-info">
              <div className="product-range-name">{v.name}</div>
              <div className="product-range-detail">{v.detail}</div>
            </div>
          </div>
        ))}
      </div>
      {caption && <div className="img-caption">{caption}</div>}
    </>
  );
}
