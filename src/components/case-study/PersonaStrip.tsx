import Image from "next/image";

interface Persona {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

interface PersonaStripProps {
  personas: Persona[];
}

export default function PersonaStrip({ personas }: PersonaStripProps) {
  return (
    <div className="persona-strip">
      {personas.map((persona, i) => (
        <div key={i} className="persona-card">
          {persona.image ? (
            <Image
              src={persona.image}
              alt={persona.name}
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          ) : (
            <div className="img-placeholder" style={{ height: 180 }}>
              <span>Persona {i + 1}</span>
            </div>
          )}
          <div className="persona-info">
            <div className="persona-name">{persona.name}</div>
            <div className="persona-role">{persona.role}</div>
            <div className="persona-detail">{persona.bio}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
