import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from "../../molecules/Navigation/LanguageSwitcher";
import { CustomAvatar } from "../../atoms/CustomAvatar";
import SideNavigation2 from '../Navbar/SideNavigation2';
import { useDispatch } from 'react-redux';
import { toggleNavigation } from 'redux/Common/reducer';


export const Header2 = () => {
  const dispatch = useDispatch();

  return(
    <>
      <Box sx={{display: 'flex'}}>
        <AppBar position="fixed">
          <Toolbar>
            {/* Hamburger Menu */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="toggle-navigation-menu"
              sx={{ mr:2 }}
              onClick={() => dispatch(toggleNavigation())}
            >
              <MenuIcon/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <LanguageSwitcher/>
            <CustomAvatar/>
          </Toolbar>
        </AppBar>
        <SideNavigation2 />
      </Box>
    </>
  )
}
