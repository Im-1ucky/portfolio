import "./About.css";
import TypingText from "../../styles/TypingText/TypingText";

const skills = [
  "App Dev",
  "Web Dev",
  "Database Management",
  "Cloud",
  "DevOps",
];

export default function About() {
  return (
    <section className="mobile-about">
      <div className="about-content">

        <p className="section-title">
          About Me
        </p>

        <h1>
          <TypingText>
            Who am I?
          </TypingText>
        </h1>

        <div className="about-text">
          <p>
            I enjoy building software from the ground up,
            from low level logic and algorithms to modern
            applications.
          </p>

          <p>
            I build Android apps, web applications and databases
            with a focus on clean architecture, performance and user experience.
            {/*I also explore cloud computing and DevOps in my free time*/}
          </p>
        </div>

        <div className="about-skills">
          {skills.map((skill) => (
            <span
              className="glass skill-pill"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
