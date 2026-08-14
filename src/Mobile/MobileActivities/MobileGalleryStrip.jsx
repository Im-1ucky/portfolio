import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!emblaApi) return;

    // Wait for this strip's staggered start time
    timeoutRef.current = setTimeout(() => {

      // Move once every 5 seconds
      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

    }, autoDelay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [emblaApi, autoDelay]);

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
