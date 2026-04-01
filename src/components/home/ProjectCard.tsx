import Link from "next/link";
import Image from "next/image";

export interface ProjectCardData {
  slug: string;
  title: string;
  category: string;
  description: string;
  coordLabel: string;
  heroImage?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/case-study/${project.slug}`} className="project-item">
      {project.heroImage ? (
        <Image
          src={project.heroImage}
          alt={project.title}
          width={1200}
          height={800}
          sizes="(max-width: 1024px) 100vw, 32vw"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
        />
      ) : (
        <div className="project-ph" />
      )}
      <span className="proj-coord">{project.coordLabel}</span>
      <div className="proj-ov">
        <div className="proj-cat">{project.category}</div>
        <div className="proj-title">{project.title}</div>
        <p className="proj-desc">{project.description}</p>
        <span className="proj-link-text">View Project &rarr;</span>
      </div>
    </Link>
  );
}
