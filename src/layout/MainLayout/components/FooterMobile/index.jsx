import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { FooterGameSvg, FooterProfileSvg } from 'src/assets/svg/Footer'
import { useTranslation } from 'react-i18next'
import { HeaderCupSvg, HeaderShopSvg, HeaderStarSvg } from 'src/assets/svg/Header'
import { useEffect, useState } from 'react'

const FooterMobile = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);

  const getMaxHeight = () => {
    return Math.max(
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    )
  }

  const dt = 5;
  const controlledFooter = () => {
    const scroll = window.scrollY;
    // console.log(scroll);
    // console.log(lastPosition);
    if (Math.abs(lastPosition - scroll) <= dt) return;
    const fHeight = document.getElementById('footer').offsetHeight;

    if (scroll > lastPosition && scroll > fHeight) {
      setIsVisible(false);
    } else {
      if (scroll < getMaxHeight()) {
        setIsVisible(true);
      }
    }
    setLastPosition(scroll);
  }

  useEffect(() => {
    window.addEventListener('scroll', controlledFooter, {passive: true});
    return () => window.removeEventListener('scroll', controlledFooter);
  }, [lastPosition])
  return (
    <Container id='footer' fluid className={`footer-mobile ${isVisible ? "" : "footer-hidden"}`}>
      <Navbar>
        <Nav>
          <NavLink
            to={"/"}
            className="nav-link"
          >
            <FooterGameSvg width="20" height="20" viewBox="0 0 20 20" />
            {t("mobile.footer.game")}
          </NavLink>

          <NavLink
            to={"/shop"}
            className="nav-link"
          >
            <HeaderShopSvg width="20" height="20" viewBox="0 0 18 14" />
            {t("header.shop")}
          </NavLink>

          <NavLink
            to={"/prize"}
            className="nav-link"
          >
            <HeaderStarSvg width="22" height="20" viewBox="0 0 18 16" />
            {t("header.prize")}
          </NavLink>

          <NavLink
            to={"/rank"}
            className="nav-link"
          >
            <HeaderCupSvg width="20" height="20" viewBox="0 0 20 20" />
            {t("header.rank")}
          </NavLink>

          <NavLink
            to={"/profile"}
            className="nav-link"
          >
            <FooterProfileSvg width="20" height="20" viewBox="0 0 20 20" />
            {t("profile.profile")}
          </NavLink>
        </Nav>
      </Navbar>
    </Container>
  )
}

export default FooterMobile