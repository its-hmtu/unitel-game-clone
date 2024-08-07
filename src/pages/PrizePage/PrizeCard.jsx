import ConfirmModal from "components/Modal/ConfirmModal";
import LoginModal from "components/Modal/LoginModal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "utils/localStorage";

const PrizeCard = ({ data, bgMinutes = false }) => {
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [packageSelect, setPackageSelect] = useState({});
  const user = getUserInfo();

  const handleConfirmModal = (item) => {
    if (user) {
      setConfirmModal(prev => !prev);
      setPackageSelect(item);
    }
    else {
      setLoginModal(prev => !prev);
    } 
  }
 
  return (
    <>
      {
        // eslint-disable-next-line react/prop-types
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className="package"
              style={{
                backgroundImage: `url(${item?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="package-heading">
                <h2>{item.name}</h2>
                <p>{t("prizepage.sub_title").replace("_DATA_", item?.name)}</p>
              </div>

              <Button
                onClick={() => handleConfirmModal(item)}
              >
                {t("prizepage.gold").replace("_GOLD_", item?.coin)}
              </Button>
            </div>
          );
        })
      }

      {confirmModal && <ConfirmModal
        show={confirmModal}
        onHide={() => setConfirmModal(false)}
        title={t("modal.prize.are_you_sure")
          .replace("_GOLD_", packageSelect?.coin)
          .replace("_REWARD_", packageSelect?.name)}
      />}

      {
        loginModal && <LoginModal 
          show={loginModal}
          onHide={() => setLoginModal(false)}
          hideDecor
        />
      }
    </>
  );
};

export default PrizeCard;
