import "./Activities.css";
import { activities } from "../../../data/activities";
import GalleryStrip from "./GalleryStrip";
import { useState } from "react";

export default function Activities() {
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
      index:
        (prev.index + 1) % prev.images.length,
    }));
  };

  if (selectedImage) {
    return (
      <div className="activities-viewer">

          <button
              className="credential-button"
              onClick={() => setSelectedImage(null)}
          >
              Back to Gallery
          </button>

          <div className="gallery-content">

              <h2 className="gallery-title">
                  {selectedImage.title}
              </h2>

              <div className="gallery-image-frame">
                  <img
                      src={selectedImage.images[selectedImage.index]}
                      alt=""
                      className="gallery-lightbox-image"
                  />
              </div>

          </div>

        <div className="experience-navigation">

          <button
            className="nav-arrow"
            onClick={previousImage}
          >
            ❮
          </button>

          <span className="experience-counter">
            {selectedImage.index + 1} / {selectedImage.images.length}
          </span>

          <button
            className="nav-arrow"
            onClick={nextImage}
          >
            ❯
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="activities-page">

      <div className="activities-intro">

        <h1>Activities</h1>

        <p>
          A collection of moments beyond academics, showcasing my contributions in creative design, student leadership, event management and innovation driven initiatives throughout my undergraduate journey.
        </p>

      </div>

      {activities.map((activity, index) => (
        <GalleryStrip
          key={activity.id}
          title={activity.title}
          images={activity.images}
          onImageClick={setSelectedImage}
          autoDelay={index * 2000}
        />
      ))}



    </div>
  );
}
