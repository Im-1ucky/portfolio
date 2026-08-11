import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
import "./Activities.css";

export default function GalleryStrip({
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
  const restartAutoScroll = () => {
    if (!emblaApi) return;

    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);

    timeoutRef.current = setTimeout(() => {
      emblaApi.scrollNext();

      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 15000);
    }, 5000);
  };

  useEffect(() => {
    if (!emblaApi) return;

    timeoutRef.current = setTimeout(() => {
      emblaApi.scrollNext();

      intervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    }, autoDelay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [emblaApi, autoDelay]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleInteraction = () => {
      restartAutoScroll();
    };

    emblaApi.on("pointerDown", handleInteraction);

    return () => {
      emblaApi.off("pointerDown", handleInteraction);
    };
  }, [emblaApi]);

  return (
    <div className="gallery-strip">

      <div className="gallery-header">

        <h2>{title}</h2>

        <div className="gallery-controls">

          <button
            className="gallery-arrow"
            onClick={() => {
              emblaApi?.scrollPrev();
              restartAutoScroll();
            }}
          >
            ❮
          </button>

          <button
            className="gallery-arrow"
            onClick={() => {
              emblaApi?.scrollNext();
              restartAutoScroll();
            }}
          >
            ❯
          </button>

        </div>

      </div>

      <div
        className="embla"
        ref={emblaRef}
      >

        <div className="embla__container">

          {images.map((image, index) => (

            <div
              className="embla__slide"
              key={index}
            >
              <img
                src={image}
                alt=""
                className="gallery-image"
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
