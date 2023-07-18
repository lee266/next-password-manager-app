import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
import  ListItemButton  from '@mui/material/ListItemButton';
import  ListItemText  from '@mui/material/ListItemText';
import { useState } from 'react';
import { Drawer } from '@mui/material';
import Link from 'next/link';

const navItems = [
  ['index', ''],
  ['password', 'password-manage'],
]
const drawerWidth = 240;

export const Header2 = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const handleDrawerToggle = () => { setNavOpen((prevState) => !prevState)}

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

        {/* side bar  */}
        <Box>
          <Drawer
            variant="temporary"
            open={navOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true,}}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Typography variant="h6" noWrap component="div" sx={{ p: 3 }}>
            </Typography>
            <Divider/>
            <List sx={{paddingTop:"0px"}}>
              {navItems.map((item) => (
                <Link key={item[0]} href={"/"+item[1]} passHref>
                  <ListItemButton 
                    selected={router.asPath === ("/"+item[1])}
                    sx={{color: router.asPath === ("/"+item[1]) ? 'accent' : 'inherit'}}
                  >
                    <ListItemText primary={t(`general.nav.${item[0]}`)}/>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Drawer>
        </Box>   
      </Box>
    </>
  )
}


