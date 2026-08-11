import "./MobilePortfolio.css";

import Home from "./Home/Home";
import About from "./About/About";
import Skills from "./Skills/Skills";
import MobileProjects from "./MobileProjects/MobileProjects";
import MobileExperience from "./MobileExperience/MobileExperience";
import MobileActivities from "./MobileActivities/MobileActivities";
import MobileContact from "./Contact/MobileContact";

export default function MobilePortfolio() {
  return (
    <div className="mobile-portfolio">

      <Home />

      <About />

      <Skills />

      <MobileProjects />

      <MobileExperience />

      <MobileActivities />

      <MobileContact/>

    </div>
  );
}
