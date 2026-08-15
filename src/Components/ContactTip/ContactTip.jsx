import "./ContactTip.css";

export default function ContactTip({
  visible,
  text,
  x,
  y,
}) {
  if (!visible) return null;

  return (
    <div
      className={
        x !== undefined
          ? "cursor-tip"
          : "contact-hint"
      }
      style={
        x !== undefined && y !== undefined
          ? {
              left: x + 18,
              top: y + 18,
              bottom: "auto",
              transform: "none",
            }
          : undefined
      }
    >
      {text}
    </div>
  );
}
