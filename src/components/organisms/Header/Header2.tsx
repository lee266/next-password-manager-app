import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from "../../molecules/Navigation/LanguageSwitcher";
import { CustomAvatar } from "../../atoms/CustomAvatar";
import { useState } from "react";
import SideNavigation2 from '../Navbar/SideNavigation2';


export const Header2 = () => {
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(!open)}
            >
              <MenuIcon/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <LanguageSwitcher/>
            <CustomAvatar/>
          </Toolbar>
        </AppBar>
        <SideNavigation2
          open={open}
          handleClose={() => setOpen(!open)}
        />
      </Box>
    </>
  )
}
