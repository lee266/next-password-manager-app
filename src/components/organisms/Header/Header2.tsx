import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from "../../molecules/Navigation/LanguageSwitcher";
import { CustomAvatar } from "../../atoms/CustomAvatar";
import  Typography  from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import  List  from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import  ListItemButton  from '@mui/material/ListItemButton';
import  ListItemText  from '@mui/material/ListItemText';
import { useState } from 'react';
import { Drawer } from '@mui/material';
import Link from 'next/link';

const navItems = [
  ['index', 'index'],
  ['password', 'password-manage'],
  ['calendar', 'calendar'],
  ['navTest', 'navigation-test']
]
const drawerWidth = 240;

export const Header2 = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleDrawerToggle = () => {
    setNavOpen((prevState) => !prevState)
  }  
  return(
    <>
      <Box sx={{display: 'flex'}}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr:2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <LanguageSwitcher/>
            <CustomAvatar/>
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer
            variant="temporary"
            open={navOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Typography>
              Navbar
            </Typography>
            <Divider/>
            <List sx={{paddingTop:"0px"}}>
              {navItems.map((item) => (
                <Link key={item[0]} href={"/"+item[1]} >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={item[0]}/>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Box>   
      </Box>
    </>
  )
}


