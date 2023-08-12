import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import styles from '../../styles/Home.module.scss';
import { Header } from '../organisms/Header/Header';
import { SideNavigation } from '../organisms/Navbar/SideNavigation';
import { MainContent } from '../molecules/MainContent2';


type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function MainLayout(props: LayoutProps) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={styles.main} sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title={props.title} open={open} handleDrawerOpen={handleDrawerOpen}></Header>
        <SideNavigation open={open} handleDrawerClose={handleDrawerClose}></SideNavigation>
        <MainContent  open={open}>
          { props.children }
        </MainContent>
      </Box>
    </>
  )
}