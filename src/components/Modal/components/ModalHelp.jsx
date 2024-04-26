import React from "react";
import { Carousel } from "react-bootstrap";

const ModalHelp = ({ data }) => {
  return (
    <Carousel wrap={true} controls={false} interval={null}>
      <Carousel.Item>
        <div className="box-item">
          {data.map((item, index) => {
            if (index < 3) {
              return (
                <div key={index} className="box-item-text">
                  <img src={item.img} alt="" />
                  <div className="text">
                    <h5>{`ຂັ້ນຕອນ${index + 1}`}</h5>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="box-item">
          {data.map((item, index) => {
            if (index > 2) {
              return (
                <div key={index} className="box-item-text">
                  <img src={item.img} alt="" />
                  <div className="text">
                    <h5>{`ຂັ້ນຕອນ${index + 1}`}</h5>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default ModalHelp;
