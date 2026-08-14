import { useEffect, useRef } from "react";
import "./MobilePortfolio.css";

import { usePortfolioScroll } from "../Context/ScrollContext";

import Home from "./Home/Home";
import About from "./About/About";
import Skills from "./Skills/Skills";
import MobileProjects from "./MobileProjects/MobileProjects";
import MobileExperience from "./MobileExperience/MobileExperience";
import MobileActivities from "./MobileActivities/MobileActivities";
import MobileContact from "./Contact/MobileContact";

export default function MobilePortfolio({ darkMode }) {
  const mobileRef = useRef(null);

  const {
    setCurrentSection,
    setScrollElement,
  } = usePortfolioScroll();

  useEffect(() => {
    const container = mobileRef.current;

    if (!container) return;

    // Tell the context that mobile has its own scroll container
    setScrollElement(container);

    const sections = Array.from(
      container.querySelectorAll(".mobile-section")
    );

    const handleScroll = () => {
      const scrollPosition =
        container.scrollTop + container.clientHeight / 2;

      let activeSection = 0;

      sections.forEach((section, index) => {
        if (section.offsetTop <= scrollPosition) {
          activeSection = index;
        }
      });

      setCurrentSection(activeSection);
    };

    handleScroll();

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [setCurrentSection, setScrollElement]);

  return (
    <div
      ref={mobileRef}
      className="mobile-portfolio"
    >
      <div className="mobile-section" id="home">
        <Home darkMode={darkMode} />
      </div>

      <div className="mobile-section" id="about">
        <About />
      </div>

      <div className="mobile-section" id="skills">
        <Skills />
      </div>

      <div className="mobile-section" id="projects">
        <MobileProjects />
      </div>

      <div className="mobile-section" id="experience">
        <MobileExperience />
      </div>

      <div className="mobile-section" id="activities">
        <MobileActivities />
      </div>

      <div className="mobile-section" id="contact">
        <MobileContact />
      </div>
    </div>
  );
}
