import React, { useState } from "react";
import BaseModal from ".";
import { Button, Container, Modal, Row } from "react-bootstrap";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import loginStep2 from "images/login-step2.svg";
import OTPInput from "react-otp-input";

const OTPConfirmModal = ({
  show,
  onHide,
  phone,
  isShopPage,
  dataSelect,
  transactionId,
  tabValue,
  isChangePass = false,
  handleChangePass,
  handleResendPassOTP,
  handleLocalStorage,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const [disabledConfirm, setDisabledConfirm] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChangeOtp = (otp) => {
    setOtp(otp);
    // if (otp.length === 6) {
    //   setDisabledConfirm(false);
    // }
  };

  const handleLogin = () => {};

  const handleSendOTP = () => {};

  const handelResendOtpMobile = () => {};

  const handleResendOtp = () => {};

  return (
    <>
      <BaseModal show={show} onHide={onHide} {...otherProps}>
        <Container className="otp-modal" fluid>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {isShopPage === "shopPage/PackageCard"
                ? t("modal.shop.title_modal_OTP")
                : t("modal.login.title_OTP")}
            </Modal.Title>
            <Modal.Body>
              <img
                src={loginStep2}
                alt="Login step 2"
                className="login-step mx-auto mb-3"
              />
              <p>
                {t("modal.login.otp_sendtophone").replace("_PHONE_", phone)}
              </p>
            </Modal.Body>
          </Modal.Header>
          <Modal.Body className={disabledConfirm && "body-err"}>
            {/* {!disabledConfirm && (
              <OTPInput
                containerStyle="otp-group"
                inputStyle="otp-input"
                value={otp}
                onChange={handleChangeOtp}
                numInputs={6}
                isInputNum={true}
              />
            )} */}
          </Modal.Body>
          <Modal.Footer>
            {!disabledConfirm && (
              <Button
                variant="secondary"
                onClick={
                  isShopPage === "shopPage/PackageCard"
                    ? handleSendOTP
                    : isChangePass
                    ? () => {
                        handleChangePass(otp);
                      }
                    : handleLogin
                }
              >
                {t("modal.login.otp_confirm")}
                {
                  // Spinner
                }
              </Button>
            )}
          </Modal.Footer>
          <Row className="login-mobile" style={{ marginTop: 0 }}>
            <p className="otp-resend big-resend">
              {t("modal.login.otp_notreceived")}{" "}
              <a
                onClick={
                  isShopPage === "shopPage/PackageCard"
                    ? handleResendOtp
                    : isChangePass
                    ? handleResendPassOTP
                    : handelResendOtpMobile
                }
              >
                {t("modal.login.otp_resend")}
              </a>
            </p>
          </Row>
        </Container>
      </BaseModal>
    </>
  );
};

export default OTPConfirmModal;
