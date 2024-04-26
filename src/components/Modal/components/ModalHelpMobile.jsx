import React, { useEffect } from 'react'
import Slider from "react-slick";

const ModalHelpMobile = ({data}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <div>
      <Slider dots={true} infinite={true} speed={100} slidesToShow={1} slidesToScroll={1} arrows={false}>
        {
          data.map((item, index) => (
            <div key={index}>
              <img src={item.img} alt="" className='mobile-img'/>
              <div className="text">
                <h5>{`ຂັ້ນຕອນ${index + 1}`}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))
        }

      </Slider>
    </div>
  )
}

export default ModalHelpMobile