import { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { clearUser } from 'redux/users/reducer';
import { openProfileDialog, openSettingDialog } from 'redux/Common/reducer';
import { useTranslation } from 'next-i18next';
import { resetPasswordManager } from 'redux/passwordManage/reducer';

export const CustomAvatar = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const avatarOpen = Boolean(anchorEl);

  const handleClick = useCallback((
    event: React.MouseEvent<HTMLElement>
    ) => {
      setAnchorEl(event.currentTarget);
    }, []
  );
  const handleClose = useCallback((
    ) => {
      setAnchorEl(null);
    }, []
  );

  const handleLogout = async() => {
    dispatch(clearUser());
    dispatch(resetPasswordManager())
    router.push("/login2");
  }

  return(
    <div>
      <IconButton
        onClick={handleClick}
        sx={{ ml: 2 }}
        aria-label="Avatar button"
      >
        <Avatar ></Avatar>
      </IconButton>
      <Menu
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
        open={avatarOpen}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 30,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={() => dispatch(openProfileDialog())}>
          <ListItemIcon>
            <AssignmentIndIcon/>
          </ListItemIcon>
          {t('general.common.profile')}
        </MenuItem>
        <MenuItem onClick={() => dispatch(openSettingDialog())}>
          <ListItemIcon>
            <Settings/>
          </ListItemIcon>
          {t('general.common.setting')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout/>
          </ListItemIcon>
          {t('general.common.logout')}
        </MenuItem>
      </Menu>
    </div>
  )
}

