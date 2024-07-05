import demoSlider from "images/demo-slider.svg";
import { useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getPageInfoQuery } from "src/data/game";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const { data: banners, isLoading } = useQuery(getPageInfoQuery());
  const navigate = useNavigate();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleClickSlider = (data) => {
    let type = data?.type?.toLowerCase();

    switch (type) {
      case "href":
        navigate(data?.link || "/");
        break;

      default:
        break;
    }
  };

  return (
    <Carousel controls={false} activeIndex={index} onSelect={handleSelect}>
      {banners?.map((item, index) => (
        <CarouselItem key={index} interval={6000}>
          <div
            onClick={() => handleClickSlider(item)}
            style={{
              cursor: "pointer",
            }}
          >
            <img
              src={item?.image}
              alt={item?.description}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = demoSlider;
              }}
            />
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default Slider;
