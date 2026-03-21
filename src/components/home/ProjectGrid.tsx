import ProjectCard, { ProjectCardData } from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectCardData[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
