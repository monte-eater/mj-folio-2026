interface YouTubeEmbedProps {
  url: string;
  caption?: string;
}

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/);
  return match ? match[1] : null;
}

export default function YouTubeEmbed({ url, caption }: YouTubeEmbedProps) {
  const videoId = extractVideoId(url);
  if (!videoId) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
      {caption && <div className="img-caption">{caption}</div>}
    </div>
  );
}
