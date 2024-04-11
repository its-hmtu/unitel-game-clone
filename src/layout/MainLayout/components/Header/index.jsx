import { Link, NavLink } from "react-router-dom";
// import { Box, Button, Grid, MenuItem, Select } from "@mui/material"
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
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";
import menu from "images/menu-svgrepo-com.svg";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { FooterGameSvg, FooterProfileSvg } from "svg/Footer";

const Header = () => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);

  const handleOpenMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
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
          <Nav className="nav-btns">
            <Button variant="primary" className="login-btn login-btn-mobile">
              {t("login.login")}
            </Button>
          </Nav>

          <Drawer anchor="left" open={showMenu} onClose={handleCloseMenu}>
            <div style={{ backgroundColor: "hsl(207deg 83% 6%)" }}>
              <div style={{width: "250px", minHeight: "100vh", paddingBottom: "100px"}}>
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
                        <li>{t("footer.contact")}</li>
                        <li>{t("footer.faq")}</li>
                      </ul>
                    </div>

                    <div>
                      <img src={footerLogo} alt="Lao app footer" style={{marginBottom: "10px"}}/>
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

          <img src={flagLa} alt="Laos's flag" className="language-icon" />
          <Nav className="nav-btns">
            <NavDropdown
              title={t("profile.setting.la")}
              className="language-btn"
            >
              <NavDropdown.Item className="">
                <img src={flagEn} alt="English's flag" />
                {t("profile.setting.en")}
              </NavDropdown.Item>

              <NavDropdown.Item>
                <img src={flagVi} alt="Vietnam's flag" />
                {t("profile.setting.vi")}
              </NavDropdown.Item>
            </NavDropdown>
            <Button variant="primary" className="login-btn">
              <HeaderUserLoginSvg
                width={24}
                height={24}
                viewBox={"0 0 24 24"}
              />
              {t("login.login")}
            </Button>
          </Nav>
        </Container>
      )}
    </Navbar>
  );
};

export default Header;
