import React from "react";
import Button from 'react-bootstrap/Button'
import { useTranslation } from "react-i18next";

const PrizeCard = ({data, bgMinutes = false}) => {
  const {t} = useTranslation();

  

  return (
    <>
      {
      // eslint-disable-next-line react/prop-types
      data?.map((item, index) => {
        return (
          <div key={index} className="package" style={
            {
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          }>
            <div className="package-heading">
              <h2>{item.name}</h2>
              <p>{t('prizepage.sub_title').replace('_DATA_', item?.name)}</p>
            </div>

            <Button>
              {t('prizepage.gold').replace('_GOLD_', item.coin)}
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default PrizeCard;
