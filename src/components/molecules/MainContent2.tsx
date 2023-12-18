import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import styles from '../../styles/Home.module.scss';

const drawerWidth = 240;

interface MainContentProps {
  open: boolean;
  children: React.ReactNode;
}

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export function MainContent(props: MainContentProps) {
  const theme = useTheme();
  return (
    <>
      <Main className={styles.content} open={props.open}>
        <div style={theme.mixins.toolbar}></div>
        {props.children}
      </Main>
    </>
  );
}
