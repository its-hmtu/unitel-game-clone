import React from "react";
import Button from 'react-bootstrap/Button'
import { useTranslation } from "react-i18next";
import bestSale from "images/shoppage-bestsale.svg"

const PackageCard = ({ data, isRetail = false }) => {
  const {t} = useTranslation();

  return (
    <>
      
      {
      // eslint-disable-next-line react/prop-types
      data.map((item, index) => {
        return (
          <div key={index} className={`package ${isRetail ? "retail" : ""}`}>
            <div className="package-heading">
              <h2>{item.title}</h2>
              <p>{item.descript}</p>
            </div>

            <img src={item.img} alt="image" />
            <Button>
              {t('shoppage.buy').replace('_PRICE_', item.price)}
            </Button>

            {item.isBestSale && <img className="package-best-sale" src={bestSale} alt="Best sale indicator"/>}
          </div>
        );
      })}
    </>
  );
};

export default PackageCard;
