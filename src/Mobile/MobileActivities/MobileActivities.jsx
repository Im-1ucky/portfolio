import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import "./MobileActivities.css";

import { activities } from "../../data/activities";
import MobileGalleryStrip from "./MobileGalleryStrip";

export default function MobileActivities() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [viewerEmblaRef, viewerEmblaApi] = useEmblaCarousel({
    loop: true,
  });

  // Keep Embla and selected image index in sync
  useEffect(() => {
    if (!viewerEmblaApi) return;

    const onSelect = () => {
      const index = viewerEmblaApi.selectedScrollSnap();

      setSelectedImage((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          index,
        };
      });
    };

    viewerEmblaApi.on("select", onSelect);

    return () => {
      viewerEmblaApi.off("select", onSelect);
    };
  }, [viewerEmblaApi]);


  // When opening the viewer, go to the clicked image
  useEffect(() => {
    if (!viewerEmblaApi || !selectedImage) return;

    viewerEmblaApi.reInit();
    viewerEmblaApi.scrollTo(selectedImage.index, true);
  }, [
    viewerEmblaApi,
    selectedImage?.title,
  ]);

  const previousImage = () => {
    viewerEmblaApi?.scrollPrev();
  };

  const nextImage = () => {
    viewerEmblaApi?.scrollNext();
  };

  if (selectedImage) {
    return (
      <div className="mobile-activities-viewer">

        <button
          className="glass mobile-activities-back"
          onClick={() => setSelectedImage(null)}
        >
          Back to Gallery
        </button>

        <div className="mobile-activities-viewer-content">

          <h2 className="mobile-activities-viewer-title">
            {selectedImage.title}
          </h2>

          {/* Swipeable viewer */}
          <div
            className="mobile-activities-viewer-embla"
            ref={viewerEmblaRef}
          >
            <div className="mobile-activities-viewer-container">

              {selectedImage.images.map((image, index) => (
                <div
                  className="mobile-activities-viewer-slide"
                  key={index}
                >
                  <div className="mobile-activities-viewer-frame">
                    <img
                      src={image}
                      alt=""
                      className="mobile-activities-viewer-image"
                    />
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

        <div className="mobile-activities-viewer-navigation">

          <button
            className="mobile-activities-arrow"
            onClick={previousImage}
          >
            ❮
          </button>

          <span className="mobile-activities-counter">
            {selectedImage.index + 1} /{" "}
            {selectedImage.images.length}
          </span>

          <button
            className="mobile-activities-arrow"
            onClick={nextImage}
          >
            ❯
          </button>

        </div>

      </div>
    );
  }

  return (
    <section className="mobile-activities">

      <div className="mobile-activities-intro">

        <p className="section-title">
          Activities
        </p>

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
            onImageClick={setSelectedImage}
            autoDelay={index * 2000}
          />
        ))}

      </div>

    </section>
  );
}
