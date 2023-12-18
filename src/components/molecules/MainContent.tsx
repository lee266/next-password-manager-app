import * as React from 'react';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

interface MainContentProps {
  children: React.ReactNode;
  open: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
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
  return (
    <>
      <Main open={props.open}>{props.children}</Main>
    </>
  );
}
