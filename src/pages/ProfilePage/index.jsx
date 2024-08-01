import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import avaDefault from "images/ava-default.jpeg";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import UserInfo from "./components/UserInfo";
import GiftHist from "./components/GiftHist";
import Setting from "./components/Setting";
import ConfirmModal from "components/Modal/ConfirmModal";
import { HeaderAccountLogoutSVG } from "svg/Header/HeaderAccountLogoutSVG";
import { HeaderAccountSettingSVG } from "svg/Header/HeaderAccountSettingSVG";
import { HeaderAccountGifthistSVG } from "svg/Header/HeaderAccountGifthistSVG";
import { HeaderAccountMyaccountSVG } from "svg/Header/HeaderAccountMyaccountSVG";
import { useQuery, useQueryClient } from "react-query";
import { getUserQuery } from "data/user";
import { destroyUserInfo } from "utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "routes/path";
import SelectAva from "./components/SelectAva";
import { makeData } from "utils/makeData";
import uploadAva from "images/profilepage-uploadava.svg";
import { queryPoint, useMediaQuery } from "utils/hooks/useMediaQuery";
import arrowNext from "images/arrow-next-white.svg";
import { TitleContext } from "contexts/TitleContext";

const ProfilePage = () => {
  const { data: user, isLoading: isUserLoading } = useQuery(getUserQuery());
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
  }, []);

  const [key, setKey] = React.useState(1);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const defaultAva = makeData("image", 16);
  const [selectAva, setSelectAva] = useState(false);
  const {title, setTitle} = useContext(TitleContext)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.sm}px)`);

  const handleSelectAva = () => {
    setSelectAva(!selectAva);
  };

  const handleCloseSelectAva = () => {
    setSelectAva(false);
  };

  const handleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const handleLogout = () => {
    destroyUserInfo();
    handleConfirmModal();
    queryClient.invalidateQueries("user-info");
    queryClient.removeQueries("user-info");
    navigate(PATHS.HOME_PAGE, { replace: true });
  };

  return (
    <>
      <Container fluid className="profile-page-container">
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Row>
            <Col sm={4} className="sidebar">
              <Row className="sidebar-info">
                <div className="ava-frame">
                  <img
                    src={user?.avatarImage || avaDefault}
                    alt="User's ava"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = avaDefault;
                    }}
                  />
                  {!isMobile && (
                    <div className="upload-ava">
                      <img
                        src={uploadAva}
                        onClick={handleSelectAva}
                        alt="Upload avatar"
                      />
                    </div>
                  )}
                </div>
                <p>{user?.displayName}</p>
              </Row>
              <Row className="sidebar-menu mt-3 flex-column">
                <Nav variant="pills" className="flex-column">
                  {!isMobile ? (
                    <>
                      <Nav.Item onClick={handleCloseSelectAva}>
                        <Nav.Link eventKey={1}>
                          <div className="d-flex align-items-center gap-2">
                            <HeaderAccountMyaccountSVG
                              width="20"
                              height="20"
                              viewBox="0 0 19 19"
                            />
                            {t("profile.sidebar.my_acc")}
                          </div>
                          {isMobile && <img src={arrowNext} alt="" />}
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item onClick={handleCloseSelectAva}>
                        <Nav.Link eventKey={2}>
                          <div className="d-flex align-items-center gap-2">
                            <HeaderAccountGifthistSVG
                              width="20"
                              height="20"
                              viewBox="0 0 19 19"
                            />
                            {t("profile.sidebar.gift_hist")}
                          </div>
                          {isMobile && <img src={arrowNext} alt="" />}
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item onClick={handleCloseSelectAva}>
                        <Nav.Link eventKey={3}>
                          <div className="d-flex align-items-center gap-2">
                            <HeaderAccountSettingSVG
                              width="20"
                              height="20"
                              viewBox="0 0 19 19"
                            />
                            {t("profile.sidebar.setting")}
                          </div>
                          {isMobile && <img src={arrowNext} alt="" />}
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  ) : (
                    <>
                      <Nav.Item onClick={handleCloseSelectAva}>
                        <Link to={PATHS.MY_ACCOUNT} onClick={
                          () => setTitle(t('mobile.my_acc.basic_info'))
                        }>
                          <div className="d-flex align-items-center gap-2">
                            <HeaderAccountMyaccountSVG
                              width="20"
                              height="20"
                              viewBox="0 0 19 19"
                            />
                            {t("profile.sidebar.my_acc")}
                          </div>
                          {isMobile && <img src={arrowNext} alt="" />}
                        </Link>
                      </Nav.Item>

                      <Nav.Item onClick={handleCloseSelectAva}>
                        <Link to={PATHS.GIFT_HIST} onClick={
                          () => setTitle(t('mobile.gift_hist.title'))
                        }>
                          <div className="d-flex align-items-center gap-2">
                            <HeaderAccountGifthistSVG
                              width="20"
                              height="20"
                              viewBox="0 0 19 19"
                            />
                            {t("profile.sidebar.gift_hist")}
                          </div>
                          {isMobile && <img src={arrowNext} alt="" />}
                        </Link>
                      </Nav.Item>

                      <Nav.Item onClick={handleCloseSelectAva}>
                        <Link to={PATHS.SETTING} onClick={
                          () => setTitle(t('mobile.setting.title'))
                        }>
                          <div className="d-flex align-items-center gap-2">
                            <HeaderAccountSettingSVG
                              width="20"
                              height="20"
                              viewBox="0 0 19 19"
                            />
                            {t("profile.sidebar.setting")}
                          </div>
                          {isMobile && <img src={arrowNext} alt="" />}
                        </Link>
                      </Nav.Item>
                    </>
                  )}

                  <Button onClick={handleConfirmModal} variant="dark">
                    <div className="d-flex align-items-center gap-2">
                      <HeaderAccountLogoutSVG
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      {t("profile.sidebar.logout")}
                    </div>
                  </Button>
                </Nav>
              </Row>
            </Col>
            {!isMobile && (
              <Col sm={8}>
                {selectAva ? (
                  <div className="profile-page-content ms-2 ms-lg-4">
                    <SelectAva defaultAva={defaultAva} />
                  </div>
                ) : (
                  <Tab.Content className="profile-page-content">
                    <Tab.Pane eventKey={1}>
                      <UserInfo
                        userData={{
                          displayName: user?.displayName,
                          msisdn: user?.msisdn,
                        }}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey={2}>
                      <GiftHist />
                    </Tab.Pane>
                    <Tab.Pane eventKey={3}>
                      <Setting />
                    </Tab.Pane>
                    <Tab.Pane eventKey={4}></Tab.Pane>
                  </Tab.Content>
                )}
              </Col>
            )}
          </Row>
        </Tab.Container>
      </Container>
      <ConfirmModal
        show={confirmModal}
        onHide={handleConfirmModal}
        onLogout={handleLogout}
        title={t("modal.profile.logout")}
      />
    </>
  );
};

export default ProfilePage;
