import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import "./MobileActivities.css";
import { activities } from "../../data/activities";
import MobileGalleryStrip from "./MobileGalleryStrip";

function MobileActivitiesViewer({ selectedImage, onClose }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "center",
      containScroll: "trimSnaps",
    },
    [
      WheelGesturesPlugin({
        forceWheelAxis: "x",
      }),
    ]
  );

  const currentIndex = selectedImage.index;

  // Open at the image that was clicked.
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(selectedImage.index, true);
  }, [emblaApi, selectedImage.title, selectedImage.index]);

  // Sync the image counter with swipe navigation.
  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      selectedImage.setIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", updateIndex);
    updateIndex();

    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi, selectedImage.setIndex]);

  // Keyboard navigation.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        emblaApi?.scrollPrev();
      } else if (event.key === "ArrowRight") {
        emblaApi?.scrollNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi, onClose]);

  // Prevent the page behind the viewer from scrolling.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="mobile-activities-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedImage.title} gallery`}
      onClick={onClose}
    >
      <button
        type="button"
        className="mobile-activities-close"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X size={22} strokeWidth={1.8} />
      </button>

      <div
        className="mobile-activities-viewer-content"
        onClick={(event) => event.stopPropagation()}
      >

        <div
          className="mobile-activities-viewer-embla"
          ref={emblaRef}
        >
          <div className="mobile-activities-viewer-container">
            {selectedImage.images.map((image, index) => (
              <div
                className="mobile-activities-viewer-slide"
                key={`${image}-${index}`}
              >
                <div className="mobile-activities-viewer-frame">
                  <img
                    src={image}
                    alt={`${selectedImage.title} ${index + 1}`}
                    className="mobile-activities-viewer-image"
                    draggable="false"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileActivities() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = useCallback(({ title, images, index }) => {
    setCurrentIndex(index);
    setSelectedImage({ title, images });
  }, []);

  const closeViewer = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const viewerData = selectedImage
    ? {
        ...selectedImage,
        index: currentIndex,
        setIndex: setCurrentIndex,
      }
    : null;

  return (
    <section className="mobile-activities">
      <div className="mobile-activities-intro">
        <p className="section-title">Activities</p>

        <p className="mobile-activities-description">
          A collection of moments beyond academics.
        </p>
      </div>

      <div className="mobile-activities-content">
        {activities.map((activity, index) => (
          <MobileGalleryStrip
            key={activity.id}
            title={activity.title}
            images={activity.images}
            onImageClick={openViewer}
            autoDelay={index * 2000}
          />
        ))}
      </div>

      {viewerData && (
        <MobileActivitiesViewer
          selectedImage={viewerData}
          onClose={closeViewer}
        />
      )}
    </section>
  );
}
