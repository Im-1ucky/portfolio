import ProjectCarousel from "../../Components/PortfolioPages/Projects/ProjectsCarousel";

export default function MobileProjectCard({
  project,
  onOpen,
}) {
  return (
    <div className="mobile-project-card">

      {/* Clicking the images opens the project */}
      <div
        className="mobile-project-carousel"
        onClick={onOpen}
      >
        <ProjectCarousel
          images={project.images}
        />
      </div>

      <div className="mobile-project-content">

        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        <button
          className="project-button"
          onClick={onOpen}
        >
          Explore Project →
        </button>

      </div>

    </div>
  );
}
