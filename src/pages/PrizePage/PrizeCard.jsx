import React from "react";
import Button from 'react-bootstrap/Button'
import { useTranslation } from "react-i18next";

const PrizeCard = ({data, bgMinutes = false}) => {
  const {t} = useTranslation();

  return (
    <>
      {
      // eslint-disable-next-line react/prop-types
      data.map((item, index) => {
        return (
          <div key={index} className={`package ${bgMinutes ? "bgMinutes" : "bgData"}`}>
            <div className="package-heading">
              <h2>{item.title}</h2>
              <p>{item.descript}</p>
            </div>

            <Button>
              {t('prizepage.gold').replace('_GOLD_', item.gold)}
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default PrizeCard;
