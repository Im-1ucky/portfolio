import "./MobileContact.css";
import TypingText from "../../styles/TypingText/TypingText";

export default function MobileContact() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const message = form.get("message");
    const subject = `Portfolio Contact — ${name}`;
    const body = `Name: ${name}

Message:
${message}`;

    const mailto =
      `mailto:luckymi11lite@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(mailto, "_blank");
  };

  const handleDownloadCV = () => {
    const url = `${import.meta.env.BASE_URL}resume.pdf`;

    // Open PDF in a new tab
    window.open(url, "_blank", "noopener,noreferrer");

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  <button
    type="button"
    onClick={handleDownloadCV}
    className="glass mobile-contact-cv"
  >
    Download CV
  </button>

  return (
    <div className="mobile-contact">

      <div className="mobile-contact-card">

        <h1>
          <TypingText key="lets-connect">
            Let's connect
          </TypingText>
        </h1>

        <p className="mobile-contact-description">
          Have a project in mind or want to talk tech?
          Feel free to reach out.
        </p>

        {/* Email */}
        <a
          href="mailto:luckymi11lite@gmail.com"
          className="mobile-contact-email"
        >
          <div className="mobile-contact-icon">
            ✉
          </div>

          <div>
            <span>Email Address</span>
            <strong>luckymi11lite@gmail.com</strong>
          </div>
        </a>

        {/* Socials */}
        <div className="mobile-contact-socials">

          <h3>FOLLOW ME</h3>

          <div className="mobile-contact-social-links">

            <a
              href="https://github.com/Im-1ucky"
              target="_blank"
              rel="noreferrer"
              className="glass mobile-contact-social"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/lucky-reddy-535811391"
              target="_blank"
              rel="noreferrer"
              className="glass mobile-contact-social"
            >
              LinkedIn
            </a>

          </div>

        </div>

        {/* Message */}
        <div className="mobile-contact-message">

          <h1>
            <TypingText key="send-message">
              Send a message
            </TypingText>
          </h1>

          <form onSubmit={handleSubmit}>

            <label>NAME</label>

            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
            />

            <label>MESSAGE</label>

            <textarea
              name="message"
              placeholder="What are we building?"
              rows="5"
              required
            />

            <button
              type="submit"
              className="glass project-button"
            >
              Send Message →
            </button>

          </form>

          {/* Download CV */}
          <button
            type="button"
            onClick={handleDownloadCV}
            className="glass mobile-contact-cv"
          >
            Download CV
          </button>

        </div>

      </div>

    </div>
  );
}
