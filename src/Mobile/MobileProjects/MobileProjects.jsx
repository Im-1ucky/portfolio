import "./MobileProjects.css";
import { projects } from "../../data/projects";
import MobileProjectCard from "./MobileProjectCard";
import MobileProjectShowcase from "./MobileProjectShowcase";
import { useState } from "react";

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
      <MobileProjectShowcase
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
      <div className="projects-content">

        <p className="section-title">
          Projects
        </p>


        <p className="projects-note">
          A collection of things I've built and explored.
        </p>

        <div className="projects-list">
          {projects.map((project) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              onOpen={() =>
                setCurrent(
                  projects.findIndex(
                    (p) => p.id === project.id
                  )
                )
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}
