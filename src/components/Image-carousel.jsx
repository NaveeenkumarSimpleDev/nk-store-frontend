import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { selectProductById } from "../feautures/product/productSlice";
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = () => {
  const product = useSelector(selectProductById);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Replace these image URLs with your actual image URLs
  const mainImages = product?.variations[0]?.images;
  const smallImages = product?.variations[0]?.images;
  
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
        {mainImages?.map((mainImage, index) => (
          <div key={index} className="relative">
            <AspectRatio ratio={3 / 2}>
              <img
                src={mainImage}
                loading="lazy"
                alt={`Main Image ${index + 1}`}
              />
            </AspectRatio>
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center mt-4">
        {smallImages?.map((smallImage, smallIndex) => (
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

export default React.memo(ImageCarousel);
