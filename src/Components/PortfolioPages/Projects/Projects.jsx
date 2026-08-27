import "./Projects.css";
import { projects } from "../../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectShowcase from "./ProjectShowcase";
import useState from "react";

export default function Projects() {
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
    <div className="projects-page">
      <div className="projects-intro">
        <h1>Projects</h1>
        <p>
          A collection of projects built throughout my engineering journey, each representing a new challenge, technology and milestone in my growth as a software engineer.
        </p>
      </div>

      <div className="projects-timeline">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            left={index % 2 === 0}
            onOpen={() => setCurrent(index)}
          />
        ))}
      </div>

    </div>
  );
}
