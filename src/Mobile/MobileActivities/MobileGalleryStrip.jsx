import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useCallback } from "react";
import TypingText from "../../styles/TypingText/TypingText";

export default function MobileGalleryStrip({
  title,
  images,
  onImageClick,
  autoDelay = 0,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const stopAutoPlay = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);

    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const startAutoPlay = useCallback(() => {
    if (!emblaApi) return;

    stopAutoPlay();

    // Start a fresh 5-second countdown
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    }, 5000);
  }, [emblaApi, stopAutoPlay]);

  useEffect(() => {
    if (!emblaApi) return;

    // Initial staggered start
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    }, autoDelay);

    return () => {
      stopAutoPlay();
    };
  }, [emblaApi, autoDelay, stopAutoPlay]);

  return (
    <div className="mobile-gallery-strip">

      <div className="mobile-gallery-header">
        <h2>
          <TypingText key={title}>
            {title}
          </TypingText>
        </h2>
      </div>

      <div
        className="mobile-gallery-embla"
        ref={emblaRef}
        onTouchStart={stopAutoPlay}
        onTouchEnd={startAutoPlay}
        onMouseDown={stopAutoPlay}
        onMouseUp={startAutoPlay}
      >
        <div className="mobile-gallery-container">

          {images.map((image, index) => (
            <div
              className="mobile-gallery-slide"
              key={index}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                onClick={() =>
                  onImageClick({
                    title,
                    images,
                    index,
                  })
                }
              />
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
