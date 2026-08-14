import "./Home.css";
import MobileModel from "../MobileModel/MobileModel";
import TypingText from "../../styles/TypingText/TypingText";

export default function Home({ darkMode }) {
  return (
    <section className="mobile-home">

      <div className="hero-content">

        <p className="section-title">
          Hello, World!
        </p>

        <h1 className="hero-name">
          <TypingText>
            I'm Lucky,
          </TypingText>
        </h1>

        <h2 className="section-title">
          and this is my portfolio.
        </h2>

      </div>

      <MobileModel darkMode={darkMode} />

    </section>
  );
}
