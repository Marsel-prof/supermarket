import React from "react";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Image({ image }) {
  const splideOptions = {
    type: "slide",
    height: 300,
    perPage: 1,
    pagination: false,
    gap: 20,
    focus: "center",
    breakpoints: {
      600: {
        height: 200,
      },
    },
  };

  return (
    <Splide options={splideOptions}>
      {image.map((item, index) => (
        <SplideSlide key={index}>
          <img src={item} className="mt-2" height={300} alt={""} />
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default Image;
