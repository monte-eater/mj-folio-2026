const fallback = [
  "Figma", "Adobe XD", "Adobe Illustrator", "Adobe Photoshop",
  "Adobe InDesign", "Adobe Target", "Axure RP", "AutoCAD",
  "SolidWorks", "HTML / CSS", "Claude AI", "Figma AI",
];

interface ToolsRowProps {
  tools?: string[];
}

export default function ToolsRow({ tools }: ToolsRowProps) {
  const items = tools?.length ? tools : fallback;
  return (
    <div className="content-section">
      <div className="section-label">Tools_004</div>
      <div className="tools-row">
        {items.map((tool) => (
          <div key={tool} className="tool-cell">
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}
