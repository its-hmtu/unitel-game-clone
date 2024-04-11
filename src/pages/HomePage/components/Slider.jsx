import banner from "images/banner_event.png";
import banner_2 from "images/demo-slider.svg";
import { Carousel, CarouselItem } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel controls={false}>
      <CarouselItem interval={6000}>
        <img src={banner} />
      </CarouselItem>
      <CarouselItem interval={6000}>
        <img src={banner_2} />
      </CarouselItem>
      <CarouselItem interval={6000}>
        <img src={banner_2} />
      </CarouselItem>
    </Carousel>
  );
};

export default Slider;
