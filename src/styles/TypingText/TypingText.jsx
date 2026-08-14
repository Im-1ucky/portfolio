import { useEffect, useRef, useState } from "react";
import "./TypingText.css";

export default function TypingText({ children }) {
  const text = String(children);

  const [visibleText, setVisibleText] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    let interval;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset
          setVisibleText("");

          let index = 0;

          interval = setInterval(() => {
            index++;

            setVisibleText(text.slice(0, index));

            if (index >= text.length) {
              clearInterval(interval);
            }
          }, 60);
        } else {
          // Reset when leaving viewport
          clearInterval(interval);
          setVisibleText("");
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(element);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [text]);

  return (
    <span ref={containerRef} className="typing-text">
      {visibleText}
      <span className="typing-cursor" />
    </span>
  );
}
