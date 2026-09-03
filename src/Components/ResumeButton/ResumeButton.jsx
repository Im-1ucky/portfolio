import "./ResumeButton.css";
import { FileText } from "lucide-react";

export default function ResumeButton() {
  return (
    <a
      className="resume-btn glass"
      href={import.meta.env.BASE_URL +"Lucky_Reddy_Resume.pdf"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="resume-text">Resume</span>
      <FileText size={20} className="resume-icon" />
    </a>
  );
}
