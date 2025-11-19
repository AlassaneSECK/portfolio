import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";
import Reveal from "@/app/components/Reveal";

import ProjectCard from "./ProjectCard";
import { projects } from "./projectsData";

/**
 * Page Projets du portfolio.
 */
export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Section>
        <SectionTitle
          eyebrow="Projets"
          title="Une expertise qui s'exprime sur le terrain"
          description="Zoom sur deux réalisations marquantes mêlant VR, mobile natif, backend et DevOps."
        />
        <div className="mt-12 flex flex-col gap-12">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
