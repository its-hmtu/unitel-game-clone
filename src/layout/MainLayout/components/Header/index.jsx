import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "images/logo.svg";
import footerLogo from "images/footer-lao-app.svg";
import {
  HeaderHomeSvg,
  HeaderShopSvg,
  HeaderStarSvg,
  HeaderCupSvg,
  HeaderUserSvg,
  HeaderMenuSvg,
  HeaderUserLoginSvg,
} from "svg/Header";
import flagLa from "images/Lao.svg.png";
import flagEn from "images/eng.png";
import flagVi from "images/Vietnam.svg.png";
import {
  Button,
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";
import menu from "images/menu-svgrepo-com.svg";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { FooterGameSvg, FooterProfileSvg } from "svg/Footer";
import LoginModal from "src/components/Modal/LoginModal";
import { destroyUserInfo, getLanguage } from "src/utils/localStorage";
import coin from "images/coin.svg";
import avaFrame from "images/ava-frame.svg";
import avaDefault from "images/ava-default.jpeg";
import { HeaderAccountMyaccountSVG } from "src/assets/svg/Header/HeaderAccountMyaccountSVG";
import { HeaderAccountGifthistSVG } from "src/assets/svg/Header/HeaderAccountGifthistSVG";
import { HeaderAccountSettingSVG } from "src/assets/svg/Header/HeaderAccountSettingSVG";
import { HeaderAccountLogoutSVG } from "src/assets/svg/Header/HeaderAccountLogoutSVG";
import { useQuery, useQueryClient } from "react-query";
import { getUserQuery } from "src/data/user";
import { userInfoKey } from "src/data/user";
import ConfirmModal from "src/components/Modal/ConfirmModal";
import { PATHS } from "routes/path";
import { getUserInfo } from "utils/localStorage";

const Header = () => {
  const { data: user, isLoading } = useQuery(getUserQuery());
  const { t } = useTranslation();
  const lng = getLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [language, setLanguage] = useState(lng || "la");
  const [userData, setUserData] = useState({});
  const queryClient = useQueryClient();
  const userStorage = getUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    setLanguage(lng);
  }, [lng]);

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     console.log(user);
  //   }
  // }, [user, isLoading]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);

  const handleOpenMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleShowLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };

  const handleShowConfirmModal = () => {
    setShowConfirmModal((prev) => !prev);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const helpData = [
    { title: t("footer.contact"), type: "contact" },
    { title: t("footer.faq"), type: "faq" },
  ];

  const handleLogout = () => {
    destroyUserInfo();
    handleShowConfirmModal();
    queryClient.invalidateQueries(userInfoKey);
    queryClient.removeQueries(userInfoKey);
    // setUserData({})
    navigate(PATHS.HOME_PAGE);
  };

  return (
    <>
      <Navbar>
        {isMobile ? (
          <Container fluid className="">
            <div className="d-flex align-items-center">
              <img
                src={menu}
                alt=""
                style={{ width: "35px", height: "25px" }}
                className="me-2"
                onClick={handleOpenMenu}
              />
              <Link to={"/"} className="navbar-brand">
                <img src={logo} alt="logo" style={{ width: "95px" }} />
              </Link>
            </div>
            {userData || userStorage ? (
              <Row className="profile-header">
                <Link
                  to={PATHS.PROFILE_PAGE}
                  replace
                  className="profile-header__coin"
                >
                  <img src={coin} alt="Total coin" />
                  <span>{userData?.coin}</span>
                </Link>

                <Dropdown align="end">
                  <Link to={PATHS.PROFILE_PAGE} replace>
                    <img
                      src={userData?.avatarImage || avaDefault}
                      alt="Avatar default"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = avaDefault;
                      }}
                    />
                    <img src={avaFrame} alt="Avatar frame" />
                  </Link>
                  {/* {<Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={PATHS.PROFILE_PAGE} replace>
                      <HeaderAccountMyaccountSVG
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      <p>{t("header.account.my_acc")}</p>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={PATHS.PROFILE_PAGE} replace>
                      <HeaderAccountGifthistSVG
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      <p>{t("header.account.gift_hist")}</p>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={PATHS.PROFILE_PAGE} replace>
                      <HeaderAccountSettingSVG
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                      />
                      <p>{t("header.account.setting")}</p>
                    </Link>
                  </Dropdown.Item>

                  <Button
                    variant="dark"
                    onClick={handleShowConfirmModal}
                    className="justify-content-start"
                  >
                    <HeaderAccountLogoutSVG
                      width="20"
                      height="20"
                      viewBox="0 0 19 19"
                    />
                    <p>{t("header.account.logout")}</p>
                  </Button>
                </Dropdown.Menu>} */}
                </Dropdown>
              </Row>
            ) : (
              <Nav className="nav-btns">
                <Button
                  variant="primary"
                  className="login-btn login-btn-mobile"
                >
                  {t("login.login")}
                </Button>
              </Nav>
            )}
            <Drawer anchor="left" open={showMenu} onClose={handleCloseMenu}>
              <div style={{ backgroundColor: "hsl(207deg 83% 6%)" }}>
                <div
                  style={{
                    width: "250px",
                    minHeight: "100vh",
                    paddingBottom: "100px",
                  }}
                >
                  <Link
                    to={"/"}
                    className="navbar-brand d-flex flex-column justify-content-center align-items-center my-2"
                  >
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: "95px", height: "38px" }}
                    />
                  </Link>
                  <Container fluid>
                    <Nav className="d-flex flex-column align-items-start navbar-nav-mobile">
                      <NavLink
                        to={"/"}
                        className="nav-link nav-link-mobile"
                        style={{ padding: "10px!important" }}
                      >
                        <FooterGameSvg
                          width={20}
                          height={20}
                          viewBox={"0 0 20 20"}
                        />
                        {t("mobile.footer.game")}
                      </NavLink>
                      <NavLink
                        to={"/shop"}
                        className="nav-link nav-link-mobile"
                        style={{ padding: "10px!important" }}
                      >
                        <HeaderShopSvg
                          width={16}
                          height={16}
                          viewBox={"0 0 16 16"}
                        />
                        {t("header.shop")}
                      </NavLink>
                      <NavLink
                        to={"/prize"}
                        className="nav-link nav-link-mobile"
                        style={{ padding: "10px!important" }}
                      >
                        <HeaderStarSvg
                          width={22}
                          height={20}
                          viewBox={"0 0 18 16"}
                        />
                        {t("header.prize")}
                      </NavLink>
                      <NavLink
                        to={"/rank"}
                        className="nav-link nav-link-mobile"
                        style={{ padding: "10px!important" }}
                      >
                        <HeaderCupSvg
                          width={16}
                          height={16}
                          viewBox={"0 0 16 16"}
                        />
                        {t("header.rank")}
                      </NavLink>
                      <NavLink
                        to={"/profile"}
                        className="nav-link nav-link-mobile"
                        style={{ padding: "10px!important" }}
                      >
                        <FooterProfileSvg
                          width={20}
                          height={20}
                          viewBox={"0 0 20 20"}
                        />
                        {t("profile.profile")}
                      </NavLink>
                    </Nav>
                    <div className="footer-nav-mobile">
                      <div className="footer-nav-mobile--link">
                        <ul>
                          {helpData.map((item, index) => (
                            <li key={index} className="footer-nav-mobile--item">
                              <NavLink to={`/${item.type}`}>
                                {t(item.title)}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <img
                          src={footerLogo}
                          alt="Lao app footer"
                          style={{ marginBottom: "10px" }}
                        />
                        <p>{t("footer.all_right")}</p>
                        <p>{t("footer.content")}</p>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </Drawer>
          </Container>
        ) : (
          <Container fluid className="">
            <Link to={"/"} className="navbar-brand">
              <img src={logo} alt="logo" />
            </Link>
            <Nav className="nav-margin">
              <NavLink to={"/"} className="nav-link">
                <HeaderHomeSvg width={16} height={16} viewBox={"0 0 16 16"} />
                {t("header.home")}
              </NavLink>
              <NavLink to={"/shop"} className="nav-link">
                <HeaderShopSvg width={16} height={16} viewBox={"0 0 16 16"} />
                {t("header.shop")}
              </NavLink>
              <NavLink to={"/prize"} className="nav-link">
                <HeaderStarSvg width={22} height={20} viewBox={"0 0 18 16"} />
                {t("header.prize")}
              </NavLink>
              <NavLink to={"/rank"} className="nav-link">
                <HeaderCupSvg width={16} height={16} viewBox={"0 0 16 16"} />
                {t("header.rank")}
              </NavLink>
            </Nav>
            <img
              src={
                language === "la" ? flagLa : language === "en" ? flagEn : flagVi
              }
              alt="Laos's flag"
              className="language-icon"
            />
            <Nav className="nav-btns">
              <NavDropdown
                title={
                  language === "la"
                    ? t("profile.setting.la")
                    : language === "en"
                    ? t("profile.setting.en")
                    : t("profile.setting.vi")
                }
                className="language-btn"
              >
                {language === "la" ? (
                  <>
                    <NavDropdown.Item
                      className=""
                      onClick={() => changeLanguage("en")}
                    >
                      <img src={flagEn} alt="English's flag" />
                      {t("profile.setting.en")}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => changeLanguage("vi")}>
                      <img src={flagVi} alt="Vietnam's flag" />
                      {t("profile.setting.vi")}
                    </NavDropdown.Item>
                  </>
                ) : language === "en" ? (
                  <>
                    <NavDropdown.Item
                      className=""
                      onClick={() => changeLanguage("la")}
                    >
                      <img src={flagLa} alt="Laos's flag" />
                      {t("profile.setting.la")}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => changeLanguage("vi")}>
                      <img src={flagVi} alt="Vietnam's flag" />
                      {t("profile.setting.vi")}
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item
                      className=""
                      onClick={() => changeLanguage("en")}
                    >
                      <img src={flagEn} alt="English's flag" />
                      {t("profile.setting.en")}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => changeLanguage("la")}>
                      <img src={flagLa} alt="Laos's flag" />
                      {t("profile.setting.la")}
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              {userData || userStorage ? (
                <Row className="profile-header">
                  <Link
                    to={PATHS.PROFILE_PAGE}
                    replace
                    className="profile-header__coin"
                  >
                    <img src={coin} alt="Total coin" />
                    <span>{userData?.coin}</span>
                  </Link>

                  <Dropdown align="end">
                    <Dropdown.Toggle>
                      <img
                        src={userData?.avatarImage || avaDefault}
                        alt="Avatar default"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = avaDefault;
                        }}
                      />
                      <img src={avaFrame} alt="Avatar frame" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to={PATHS.PROFILE_PAGE} replace>
                          <HeaderAccountMyaccountSVG
                            width="20"
                            height="20"
                            viewBox="0 0 19 19"
                          />
                          <p>{t("header.account.my_acc")}</p>
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link to={PATHS.PROFILE_PAGE} replace>
                          <HeaderAccountGifthistSVG
                            width="20"
                            height="20"
                            viewBox="0 0 19 19"
                          />
                          <p>{t("header.account.gift_hist")}</p>
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link to={PATHS.PROFILE_PAGE} replace>
                          <HeaderAccountSettingSVG
                            width="20"
                            height="20"
                            viewBox="0 0 19 19"
                          />
                          <p>{t("header.account.setting")}</p>
                        </Link>
                      </Dropdown.Item>

                      <Button
                        variant="dark"
                        onClick={handleShowConfirmModal}
                        className="justify-content-start"
                      >
                        <HeaderAccountLogoutSVG
                          width="20"
                          height="20"
                          viewBox="0 0 19 19"
                        />
                        <p>{t("header.account.logout")}</p>
                      </Button>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              ) : (
                <Button
                  variant="primary"
                  className="login-btn"
                  onClick={handleShowLoginModal}
                >
                  <HeaderUserLoginSvg
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                  />
                  {t("login.login")}
                </Button>
              )}
            </Nav>
          </Container>
        )}
      </Navbar>
      <LoginModal
        show={showLoginModal}
        onHide={() => {
          setShowLoginModal((prev) => !prev);
        }}
      />
      {showConfirmModal && (
        <ConfirmModal
          show={showConfirmModal}
          onHide={handleShowConfirmModal}
          title={t("modal.profile.logout")}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
