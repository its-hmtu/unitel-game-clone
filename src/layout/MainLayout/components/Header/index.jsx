import { Link, NavLink } from "react-router-dom"
import { Box, Button, Grid, MenuItem, Select } from "@mui/material"
import logo from "images/logo.svg"
import { 
  HeaderHomeSvg,
  HeaderShopSvg, 
  HeaderStarSvg, 
  HeaderCupSvg, 
  HeaderUserSvg, 
  HeaderMenuSvg 
} from "svg/Header"
import flagLa from "images/Lao.svg.png"
import flagEn from "images/eng.png"
import flagVi from "images/Vietnam.svg.png"
import { HeaderArrowDownSvg, HeaderUserLoginSvg } from "src/assets/svg/Header"

const Header = () => {
  return (
    <nav>
      <Grid className="navbar-container" 
        direction={"row"} 
        container 
        justifyContent={"space-between"}
        alignItems={"center"}
        >
        <Link to={"/"}>
          <img src={logo} alt="website's logo" />
        </Link>
        <Box className="navbar-nav" display={"flex"}>
          <NavLink 
            className={'navbar-nav--item'}
            to={"/"}
          >
            <HeaderHomeSvg width={16} height={16} viewBox={"0 0 16 16"} />
            Home
          </NavLink>

          <NavLink 
            className={'navbar-nav--item'}
            to={"/shop"}
          >
            <HeaderShopSvg width={16} height={16} viewBox={"0 0 16 16"} />
            Shop
          </NavLink>

          <NavLink 
            className={'navbar-nav--item'}
            to={"/prize"}
          >
            <HeaderStarSvg width={16} height={16} viewBox={"0 0 16 16"} />
            Prize
          </NavLink>

          <NavLink 
            className={'navbar-nav--item'}
            to={"/rank"}
          >
            <HeaderCupSvg width={16} height={16} viewBox={"0 0 16 16"} />
            Rank
          </NavLink>

          <NavLink 
            className={'navbar-nav--item'}
            to={"/spine"}
          >
            <HeaderUserSvg width={16} height={16} viewBox={"0 0 16 16"} />
            Spine
          </NavLink>

          <NavLink 
            className={'navbar-nav--item'}
            to={"/more"}
          >
            <HeaderMenuSvg width={16} height={16} viewBox={"0 0 16 16"} />
            More
          </NavLink>
        </Box>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img src={flagEn} alt="English flag icon" className="flag-icon" />
          <Button className="language-btn" variant="text" disableElevation disableRipple>
            English
            <HeaderArrowDownSvg width={18} height={18} viewBox={"0 0 18 18"} />
          </Button>
          <Button className="login-btn" variant="contained" disableElevation disableRipple>
            <HeaderUserLoginSvg width={24} height={24} viewBox={"0 0 24 24"} />
            Login
          </Button>
        </Box>
      </Grid>
    </nav>
  )
}

export default Header