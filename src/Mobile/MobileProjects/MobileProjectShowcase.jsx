import "./MobileProjects.css";
import ProjectCarousel from "../../Components/PortfolioPages/Projects/ProjectsCarousel";
import TypingText from "../../styles/TypingText/TypingText";

export default function MobileProjectShowcase({
  project,
  current,
  total,
  previous,
  next,
  onClose,
}) {
  if (!project) return null;

  return (
    <div className="mobile-project-showcase">

      <button
        className="glass credential-button"
        onClick={onClose}
      >
        Back to Projects
      </button>

      {/* Project photos */}
      <div className="project-showcase-carousel">
        <ProjectCarousel
          images={project.images}
        />
      </div>

      {/* Project information */}
      <div className="project-showcase-content">

        <h2>
          <TypingText key={project.id}>
            {project.title}
          </TypingText>
        </h2>

        <h2>Overview</h2>

        <p>{project.overview}</p>

        <h2>Technologies</h2>

        <div className="project-tech">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="glass"
            >
              {technology}
            </span>
          ))}
        </div>

        <h2>Features</h2>

        <ul className="project-features">
          {project.features.map((feature) => (
            <li key={feature}>
              {feature}
            </li>
          ))}
        </ul>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="glass project-button"
          >
            Read more →
          </a>
        )}

        {/* Switch projects */}
        <div className="experience-navigation">

          <button
            className="nav-arrow"
            onClick={previous}
          >
            ❮
          </button>

          <span className="experience-counter">
            {current + 1} / {total}
          </span>

          <button
            className="nav-arrow"
            onClick={next}
          >
            ❯
          </button>

        </div>

      </div>

    </div>
  );
}
