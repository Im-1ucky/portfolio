import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useCallback } from "react";
import "./Projects.css";

export default function ProjectCarousel({ images = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const intervalRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    if (!emblaApi) return;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
  }, [emblaApi]);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, [emblaApi, startAutoPlay, stopAutoPlay]);

  return (
    <div
      className="project-embla"
      ref={emblaRef}
      onTouchStart={stopAutoPlay}
      onTouchEnd={startAutoPlay}
      onMouseDown={stopAutoPlay}
      onMouseUp={startAutoPlay}
    >
      <div className="project-embla-container">
        {images.map((image, index) => (
          <div
            className="project-embla-slide"
            key={index}
          >
            <img
              src={image}
              alt=""
              className="project-preview-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
