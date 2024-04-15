import { memo, useRef } from 'react';
import {
	StackedCarousel,
	ResponsiveContainer,
} from 'react-stacked-center-carousel';
import img1 from "images/demo-slider.svg";
import img2 from "images/banner_event.png";
import { queryPoint, useMediaQuery } from 'src/utils/hooks/useMediaQuery';

const SliderMobile = () => {
  const ref = useRef(<StackedCarousel></StackedCarousel>)

  const data = [
    img1, 
    img1,
    img2
  ]

  const isMobile = useMediaQuery(`(max-width: ${queryPoint.sm}px)`)
  const isMobileXs = useMediaQuery(`(max-width: ${queryPoint.xs}px)`)
  const Slide = () => {
    const index = 0; // Add the missing 'index' variable declaration
    if (data && data.length > 0) {
      return (
        <div>
          <img draggable={false} src={data[index]} alt="" />
        </div>
      )
    }
  }

  return (
    <ResponsiveContainer
      carouselRef={ref}
      render={(parentWidth, carouselRef) => {
        let currentSlides = 3
        return (
          <StackedCarousel
            className='slider-mobile' 
            ref={carouselRef}
            data={data}
            carouselWidth={parentWidth}
            slideWidth={isMobileXs ? 300 : isMobile ? 350 : 450}
            fadeDistance={isMobile ? 0 : 0.3}
            slideComponent={Slide}
            maxVisibleSlide={currentSlides}
            currentVisibleSlide={currentSlides}
            useGrabCursor
          />
        )
      }}
    >
      
    </ResponsiveContainer>
  )
}

export default SliderMobile