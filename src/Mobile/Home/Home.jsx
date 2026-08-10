import "./Home.css";
import MobileModel from "../MobileModel/MobileModel";

export default function Home() {
  return (
    <section className="mobile-home">

      <div className="hero-content">

        <p className="section-title">
          Hello, World!
        </p>

        <h1 className="hero-name">
          <span
            className="typing-effect"
            style={{
              "--typing-steps": 10,
              "--typing-width": "9.5ch",
            }}
          >
            I'm Lucky,
          </span>
        </h1>

        <h2 className="section-title">
          and this is my portfolio.
        </h2>

      </div>

      <MobileModel />

    </section>
  );
}
