import { useEffect, useRef } from "react";
import "./Skills.css";

import {
  SiCplusplus,
  SiPython,
  SiKotlin,
  SiJavascript,
  SiDart,
  SiMysql,
  SiPostgresql,
  SiFlutter,
  SiJetpackcompose,
  SiReact,
  SiLinux,
  SiGithub,
  SiNeovim,
  SiArchlinux,
  SiGnubash,
  SiBlender,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "C/C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
    ],
  },

  {
    title: "Frameworks",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Jetpack Compose", icon: SiJetpackcompose, color: "#4285F4" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
    ],
  },

  {
    title: "Tools",
    skills: [
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Git/GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Neovim", icon: SiNeovim, color: "#57A143" },
      { name: "Arch Linux", icon: SiArchlinux, color: "#1793D1" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
      { name: "Blender", icon: SiBlender, color: "#F5792A" },
    ],
  },
];

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);


// ONE generic animation function
const animateSkill = (item, container) => {
  const icon = item.querySelector(".skill-icon");

  if (!icon) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  const viewportHeight = container.clientHeight;

  const itemTop =
    itemRect.top -
    containerRect.top +
    container.scrollTop;

  // Animation starts when the skill reaches
  // roughly the bottom 15% of the viewport.
  const start =
    itemTop - viewportHeight * 0.85;

  // Animation finishes after moving further
  // into the viewport.
  const end =
    itemTop - viewportHeight * 0.35;

  const progress = clamp(
    (container.scrollTop - start) /
      (end - start),
    0,
    1
  );

  // Smooth easing
  const eased =
    1 - Math.pow(1 - progress, 3);

  // Left column enters from left.
  // Right column enters from right.
  const direction =
    item.dataset.column === "right"
      ? 1
      : -1;

  // Distance from outside the screen
  const x =
    direction * (1 - eased) * 120;

  // Rolling rotation
  const rotation =
    direction * (1 - eased) * 720;

  icon.style.transform = `
    translateX(${x}vw)
    rotate(${rotation}deg)
  `;

  icon.style.opacity = eased;
};


export default function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    const section = skillsRef.current;
    const container =
      section?.closest(".mobile-portfolio");

    if (!section || !container) return;

    const updateAnimation = () => {
      const items =
        section.querySelectorAll(".skill-item");

      items.forEach((item) => {
        animateSkill(item, container);
      });
    };

    // Set initial positions
    updateAnimation();

    container.addEventListener(
      "scroll",
      updateAnimation,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateAnimation
    );

    return () => {
      container.removeEventListener(
        "scroll",
        updateAnimation
      );

      window.removeEventListener(
        "resize",
        updateAnimation
      );
    };
  }, []);

  return (
    <section
      ref={skillsRef}
      className="mobile-skills"
    >
      <div className="skills-content">

        <p className="section-title">
          Skills
        </p>

        <p className="skills-note">
          Always learning, always building.
        </p>

        {skillGroups.map((group) => (
          <div
            className="skill-group"
            key={group.title}
          >
            <h2 className="skill-group-title">
              <span
                className="typing-effect"
                style={{
                  "--typing-steps": group.title.length,
                  "--typing-width": `${group.title.length}ch`,
                }}
              >
                {group.title}
              </span>
            </h2>

            <div className="skills-grid">
              {group.skills.map(
                ({ name, icon: Icon, color }, index) => (
                  <div
                    className="skill-item"
                    key={name}
                    data-column={
                      index % 2 === 0
                        ? "left"
                        : "right"
                    }
                  >
                    <div className="glass skill-icon">
                      <Icon
                        size={28}
                        color={color}
                      />
                    </div>

                    <span>{name}</span>
                  </div>
                )
              )}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
