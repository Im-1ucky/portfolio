import { useRef, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { Info } from "lucide-react";

import Scene from "./Scene/Scene";
import BottomNav from "./Components/BottomNav/BottomNav";
import Loader from "./Components/Loader/Loader";
import { usePortfolioScroll } from "./Context/ScrollContext";
import ContactTip from "./Components/ContactTip/ContactTip";
import ResumeButton from "./Components/ResumeButton/ResumeButton";
import ScrollHint from "./Components/ScrollHint/ScrollHint";
import Overlay from "./Components/PortfolioPages/Overlay/Overlay";
import Experience from "./Components/PortfolioPages/Experience/Experience";
import Activities from "./Components/PortfolioPages/Activities/Activities";
import Projects from "./Components/PortfolioPages/Projects/Projects";
import MobilePortfolio from "./Mobile/MobilePortfolio";

export default function App() {
  const containerRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [darkMode, setDarkMode] = useState(false);
  const pageMap = {
    4: "experience",
    3: "projects",
    5: "activities",
  };
  const {
    currentSection,
    setCurrentSection,
    scrollElement,
  } = usePortfolioScroll();
  const { active, progress } = useProgress();
  const [fadeLoader, setFadeLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showContactHint, setShowContactHint] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [overlayPage, setOverlayPage] = useState(null);
  const labels = {
    projects: "Explore Projects",
    experience: "View Experience",
    activities: "Browse Activities",
  };

  useEffect(() => {
    if (!active && progress === 100) {

      const fadeTimer = setTimeout(() => {
        setFadeLoader(true);
      }, 500);

      const hideTimer = setTimeout(() => {
        setShowLoader(false);
      }, 800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

    if (active) {
      setShowLoader(true);
      setFadeLoader(false);
    }

  }, [active, progress]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (currentSection === 6) {
      setShowContactHint(true);

      const timer = setTimeout(() => {
        setShowContactHint(false);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setShowContactHint(false);
    }
  }, [currentSection]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!scrollElement) return;

    if (currentSection === 6) {
      setShowScrollHint(false);
      return;
    }

    let timer;

    if (currentSection !== 6 && !showLoader) {
      const initialTimer = setTimeout(() => {
        setShowScrollHint(true);
      }, 700);

      timer = initialTimer;
    }

    const handleScroll = () => {
      setShowScrollHint(false);

      clearTimeout(timer);

      if (currentSection === 6) return;

      timer = setTimeout(() => {
        setShowScrollHint(true);
      }, 5000);  //Change this to change scrolltip duration
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [scrollElement, currentSection, showLoader]);

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        {showLoader && (
          <Loader
            progress={progress}
            fade={fadeLoader}
          />
        )}

        {!showLoader && (
          <>
            <MobilePortfolio />

            <BottomNav
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isMobile={isMobile}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}>
      {showLoader && (
          <Loader
              progress={progress}
              fade={fadeLoader}
          />
      )}

      <Scene
        darkMode={darkMode}
        eventSource={containerRef}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        setOverlayPage={setOverlayPage}
        overlayPage={overlayPage}
        setCursorLabel={setCursorLabel}
      />

      <ResumeButton />

      <BottomNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMobile={isMobile}
      />

      <ScrollHint
        visible={showScrollHint}
      />

      <ContactTip
        visible={showContactHint}
        text="Click link to visit its page ↗"
      />

      <ContactTip
        visible={cursorLabel !== ""}
        text={cursorLabel}
        x={mousePosition.x}
        y={mousePosition.y}
      />

      {overlayPage === null && pageMap[currentSection] && (
        <div className="info-hotspot-container">
          <button
            className="info-hotspot"
            onClick={() => setOverlayPage(pageMap[currentSection])}
          >
            <Info size={20} />
          </button>

          <span className="info-hotspot-text">
            {labels[pageMap[currentSection]]}
          </span>
        </div>
      )}

      <Overlay
        open={overlayPage !== null}
        onClose={() => setOverlayPage(null)}
      >
        {overlayPage === "experience" && <Experience />}

        {overlayPage === "activities" && <Activities />}

        {overlayPage === "projects" && <Projects />}
      </Overlay>
    </div>
  );
}
