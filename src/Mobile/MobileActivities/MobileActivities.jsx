import { useState } from "react";
import "./MobileActivities.css";

import { activities } from "../../data/activities";
import MobileGalleryStrip from "./MobileGalleryStrip";

export default function MobileActivities() {
  const [selectedImage, setSelectedImage] = useState(null);

  const previousImage = () => {
    setSelectedImage((prev) => ({
      ...prev,
      index:
        prev.index === 0
          ? prev.images.length - 1
          : prev.index - 1,
    }));
  };

  const nextImage = () => {
    setSelectedImage((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
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

          <div className="mobile-activities-viewer-frame">
            <img
              src={
                selectedImage.images[selectedImage.index]
              }
              alt=""
              className="mobile-activities-viewer-image"
            />
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
