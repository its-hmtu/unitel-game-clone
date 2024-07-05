import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { PATHS } from "routes/path";

const ProfilePage = () => {
  const {data: user, isLoading: isUserLoading} = useQuery(getUserQuery())
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
  }, [])


  const [key, setKey] = React.useState(1);
  const [confirmModal, setConfirmModal] = React.useState(false);

  const handleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const handleLogout = () => {
    destroyUserInfo();
    handleConfirmModal();
    queryClient.invalidateQueries('user-info');
    queryClient.removeQueries('user-info');
    navigate(PATHS.HOME_PAGE, { replace: true })
  }

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
                </div>
                <p>{user?.displayName}</p>
              </Row>
              <Row className="sidebar-menu mt-3 flex-column">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey={1}>
                      <HeaderAccountMyaccountSVG 
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      {t("profile.sidebar.my_acc")}
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={2}>
                      <HeaderAccountGifthistSVG 
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      {t("profile.sidebar.gift_hist")}
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={3}>
                      <HeaderAccountSettingSVG 
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      {t("profile.sidebar.setting")}
                    </Nav.Link>
                  </Nav.Item>

                  <Button onClick={handleConfirmModal} variant="dark">
                    <HeaderAccountLogoutSVG 
                      width="20"
											height="20"
											viewBox="0 0 19 19"
                    />
                    {t("profile.sidebar.logout")}
                    </Button>
                </Nav>
              </Row>
            </Col>
            <Col sm={8}>
              <Tab.Content className="profile-page-content">
                <Tab.Pane eventKey={1}>
                  <UserInfo
                    userData={
                      {
                        displayName: user?.displayName,
                        msisdn: user?.msisdn,
                      }
                    }
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
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <ConfirmModal 
        show={confirmModal} 
        onHide={handleConfirmModal}
        onLogout={handleLogout}
        title={t('modal.profile.logout')} 
      />
    </>
  );
};

export default ProfilePage;
