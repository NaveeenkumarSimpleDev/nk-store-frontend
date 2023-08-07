import img1 from "/1.jpg";
import img2 from "/2.jpg";
import img3 from "/3.jpg";

import React, { useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef( null);

  // Replace these image URLs with your actual image URLs
  const mainImages = [img1, img2, img3];
  const smallImages = [img1, img2, img3];

  const handleSmallImageClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-w-full">
      <Carousel
        showArrows={true}
        showThumbs={false}
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
        ref={carouselRef}
      >
        {mainImages.map((mainImage, index) => (
          <div key={index} className="relative">
            <img src={mainImage} alt={`Main Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center mt-4">
        {smallImages.map((smallImage, smallIndex) => (
          <div
            key={smallIndex}
            className="cursor-pointer mx-2"
            onClick={() => handleSmallImageClick(smallIndex)}
          >
            <img
              src={smallImage}
              alt={`Small Image ${smallIndex + 1}`}
              className="w-16 h-16 rounded-lg object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
