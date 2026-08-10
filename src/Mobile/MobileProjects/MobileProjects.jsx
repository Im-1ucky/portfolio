import "./MobileProjects.css";

import { useState } from "react";

import { projects } from "../../data/projects";

import MobileProjectCard from "./MobileProjectCard";

import ProjectShowcase from "../../Components/PortfolioPages/Projects/ProjectShowcase";

export default function MobileProjects() {
  const [current, setCurrent] = useState(null);

  const previous = () => {
    setCurrent((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  if (current !== null) {
    return (
      <ProjectShowcase
        project={projects[current]}
        current={current}
        total={projects.length}
        previous={previous}
        next={next}
        onClose={() => setCurrent(null)}
      />
    );
  }

  return (
    <section className="mobile-projects">

      <p className="section-title">
        Projects
      </p>

      <div className="mobile-projects-list">
        {projects.map((project, index) => (
          <MobileProjectCard
            key={project.id}
            project={project}
            onOpen={() => setCurrent(index)}
          />
        ))}
      </div>

    </section>
  );
}
