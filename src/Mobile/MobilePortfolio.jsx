import "./MobilePortfolio.css";

import Home from "./Home/Home";
import About from "./About/About";
import Skills from "./Skills/Skills";
import MobileProjects from "./MobileProjects/MobileProjects";

export default function MobilePortfolio() {
  return (
    <div className="mobile-portfolio">

      <Home />

      <About />

      <Skills />

      <MobileProjects />

    </div>
  );
}
