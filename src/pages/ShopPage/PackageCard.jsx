import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import bestSale from "images/shoppage-bestsale.svg";
import package1 from "images/shoppage-package1.svg";
import package2 from "images/shoppage-package2.svg";
import package3 from "images/shoppage-package3.svg";
import package4 from "images/shoppage-package4.svg";
import package5 from "images/shoppage-package5.svg";
import ConfirmModal from "components/Modal/ConfirmModal";
import { getUserInfo } from "utils/localStorage";
import LoginModal from "components/Modal/LoginModal";
import OTPConfirmModal from "components/Modal/OTPConfirmModal";

const PackageCard = ({ data, isRetail = false}) => {
  const { t } = useTranslation();
  const images = [package1, package2, package3, package4, package5];

  const [confirmModal, setConfirmModal] = useState(false);
  const [packageSelect, setPackageSelect] = useState({});
  const [itemSelect, setItemSelect] = useState({});
  const [otpModal, setOtpModal] = useState(false)

  // const handleConfirmModal = (item) => {
  //   setConfirmModal(!confirmModal);
  //   setPackageSelect(item);
  // };

  function openConfirmModal(item) {
    if (user) {
      setItemSelect(item);
      setConfirmModal(true);
      setPackageSelect(item?.name);
    }
  }

  function closeConfirmModal() {
    setConfirmModal(false);
  }

  const user = getUserInfo();
  return (
    <>
      {
        data?.map((item, index) => {
          return (
            <div key={index} className={`package ${isRetail ? "retail" : ""}`}>
              <div className="package-heading">
                <h2>{item?.name}</h2>
                <p>
                  {t("shoppage.reward_desc").replace(
                    "_GOLD_",
                    new Intl.NumberFormat("lo").format(parseInt(item?.coin))
                  )}
                </p>
              </div>

              <img src={images[index]} alt="image" />
              <Button
                onClick={() => openConfirmModal(item)}              
              >{t("shoppage.buy").replace("_PRICE_", item?.fee)}</Button>

              {item?.isHot === 1 && (
                <img
                  className="package-best-sale"
                  src={bestSale}
                  alt="Best sale indicator"
                />
              )}
            </div>
          );
        })
      }
      {user ? (
        confirmModal && <ConfirmModal
          show={confirmModal}
          onHide={closeConfirmModal}
          onOpenOTP={() => {
            setOtpModal(true);
            setConfirmModal(false);
          }}
          title={t("modal.shop.are_you_sure").replace(
            "_PACKAGE_",
            packageSelect?.name
          )}
        />
      ) :  (confirmModal && <LoginModal show={confirmModal} onHide={() => setConfirmModal(false)} />)}

      {
        <OTPConfirmModal 
          isShopPage="shopPage/PackageCard"
          show={otpModal} 
          onHide={() => setOtpModal(false)}
          dataSelect={itemSelect}
          phone={user?.msisdn}
          hideDecor
        />
      }
    </>
  );
};

export default PackageCard;
