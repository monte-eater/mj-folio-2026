interface QuoteBlockProps {
  text: string;
  attribution: string;
}

export default function QuoteBlock({ text, attribution }: QuoteBlockProps) {
  return (
    <div className="quote-block">
      <div className="quote-text">&ldquo;{text}&rdquo;</div>
      <div className="quote-attr">{attribution}</div>
    </div>
  );
}
