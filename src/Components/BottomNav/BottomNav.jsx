import { useState } from "react";
import "./BottomNav.css";
import { usePortfolioScroll } from "../../Context/ScrollContext";
import { Sun, Moon } from "lucide-react";

const sections = [
  "HOME",
  "ABOUT ME",
  "SKILLS",
  "PROJECTS",
  "EXPERIENCE",
  "ACTIVITIES",
  "CONTACT ME",
];

export default function BottomNav({
  darkMode,
  setDarkMode,
  isMobile,
}) {
  const [expanded, setExpanded] = useState(false);

  const {
    currentSection,
    scrollElement,
    sectionPositions,
  } = usePortfolioScroll();

  function goToSection(index) {
    if (isMobile) {
      const sectionIds = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "activities",
        "contact",
      ];

      const section = document.getElementById(sectionIds[index]);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setExpanded(false);
      return;
    }

    // Desktop navigation
    if (!scrollElement) return;

    scrollElement.scrollTo({
      top:
        sectionPositions[index] *
        (scrollElement.scrollHeight - scrollElement.clientHeight),
      behavior: "smooth",
    });

    setExpanded(false);
  }

  return (
    <div className={`bottom-nav glass ${expanded ? "expanded" : ""}`}>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="nav-divider"></div>

      <button
        className="nav-arrow"
        onClick={() => {
          const nextIndex =
            currentSection === 0
              ? sections.length - 1
              : currentSection - 1;

          goToSection(nextIndex);
        }}
      >
        ❮
      </button>

      <button
        className="nav-center"
        onClick={() => setExpanded(!expanded)}
      >
        {sections[currentSection]}
      </button>

      {expanded && (
        <div className={`nav-items ${isMobile ? "mobile" : "desktop"}`}>
          {sections.map((section, index) => (
            <button
              key={section}
              className={
                currentSection === index ? "nav-item active" : "nav-item"
              }
              onClick={() => goToSection(index)}
            >
              {section}
            </button>
          ))}
        </div>
      )}

      <button
        className="nav-arrow"
        onClick={() => {
          const nextIndex =
            currentSection === sections.length - 1
              ? 0
              : currentSection + 1;

          goToSection(nextIndex);
        }}
      >
        ❯
      </button>
    </div>
  );
}
