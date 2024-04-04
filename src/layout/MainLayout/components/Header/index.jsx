import { Link, NavLink } from "react-router-dom"
import { Box, Button, Grid } from "@mui/material"
import logo from "images/logo.svg"
import { 
  HeaderHomeSvg,
  HeaderShopSvg, 
  HeaderStarSvg, 
  HeaderCupSvg, 
  HeaderUserSvg, 
  HeaderMenuSvg 
} from "svg/Header"

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
          <NavLink className={'navbar-nav--item'}>
            <HeaderHomeSvg width={16} height={16} viewBox={"0 0 17 16"} />
            Home
          </NavLink>

          <NavLink className={'navbar-nav--item'}>
            <HeaderShopSvg width={16} height={16} viewBox={"0 0 17 16"} />
            Shop
          </NavLink>

          <NavLink className={'navbar-nav--item'}>
            <HeaderStarSvg width={16} height={16} viewBox={"0 0 17 16"} />
            Prize
          </NavLink>

          <NavLink className={'navbar-nav--item'}>
            <HeaderCupSvg width={16} height={16} viewBox={"0 0 17 16"} />
            Rank
          </NavLink>

          <NavLink className={'navbar-nav--item'}>
            <HeaderUserSvg width={16} height={16} viewBox={"0 0 17 16"} />
            Spine
          </NavLink>

          <NavLink className={'navbar-nav--item'}>
            <HeaderMenuSvg width={16} height={16} viewBox={"0 0 17 16"} />
            More
          </NavLink>
        </Box>

        <div>
          <Button variant="contained" disableElevation disableRipple>
            Login
          </Button>
        </div>
      </Grid>
    </nav>
  )
}

export default Header