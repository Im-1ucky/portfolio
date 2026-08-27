import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import "./MobileExperience.css";
import TypingText from "../../styles/TypingText/TypingText";
import { experiences } from "../../data/experiences";

export default function MobileExperience() {
  const [current, setCurrent] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const experience = experiences[current];

  // Update the text/details when the certificate changes
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const previous = () => {
    emblaApi?.scrollPrev();
  };

  const next = () => {
    emblaApi?.scrollNext();
  };

  return (
    <section className="mobile-experience">

      <div className="mobile-experience-intro">
        <h1>Experience</h1>

        <p>
          My professional journey through internships and industry projects.
        </p>
      </div>

      <div className="mobile-experience-content">

        <div className="mobile-experience-heading">
          <h1>
            <TypingText key={experience.id}>
              {experience.title}
            </TypingText>
          </h1>

          <h2>{experience.company}</h2>
        </div>

        {/* Certificate carousel */}
        <div
          className="mobile-experience-certificate"
          ref={emblaRef}
        >
          <div className="mobile-experience-certificate-container">

            {experiences.map((item) => (
              <div
                className="mobile-experience-certificate-slide"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>
            ))}

          </div>
        </div>

        <div className="mobile-experience-navigation">

          <button
            className="mobile-experience-arrow"
            onClick={previous}
          >
            ❮
          </button>

          <span className="mobile-experience-counter">
            {current + 1} / {experiences.length}
          </span>

          <button
            className="mobile-experience-arrow"
            onClick={next}
          >
            ❯
          </button>

        </div>

        <div className="mobile-experience-details">

          <div className="mobile-experience-about">
            <h3>About</h3>
            <p>{experience.about}</p>
          </div>

          <p className="mobile-experience-duration">
            <strong>Duration:</strong>{" "}
            {experience.duration}
          </p>

          <div className="mobile-experience-skills">
            <h3>Skills</h3>

            <div className="mobile-experience-skill-list">
              {experience.skills.map((skill) => (
                <span
                  key={skill}
                  className="glass mobile-experience-skill"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <a
            href={experience.credential}
            target="_blank"
            rel="noreferrer"
            className="glass project-button"
          >
            View Credential →
          </a>

        </div>

      </div>

    </section>
  );
}
