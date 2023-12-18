import Menu from '@mui/material/Menu';
import { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

type CustomMenuProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  paperProps?: MuiPaperProps;
  arrowPositionRight?: number;
  showArrow?: boolean;
};

const CustomMenu: React.FC<CustomMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onClick,
  children,
  paperProps,
  arrowPositionRight = 30,
  showArrow = true,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const changeTheme = useSelector((state: RootState) => state.common.changeTheme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme && storedTheme !== 'system' ? storedTheme : isSystemDarkMode ? 'dark' : 'light';
    setIsDarkMode(initialTheme === 'dark');
  }, [changeTheme]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClick}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={paperProps}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isDarkMode ? '#1A2229' : '#fff',
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 5,
          },
          '&:before': showArrow
            ? {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: arrowPositionRight,
                width: 10,
                height: 10,
                bgcolor: isDarkMode ? '#1A2229' : '#fff',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              }
            : {},
        },
        '.MuiMenuItem-root': {
          backgroundColor: isDarkMode ? '#1A2229' : '#fff',
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default CustomMenu;
