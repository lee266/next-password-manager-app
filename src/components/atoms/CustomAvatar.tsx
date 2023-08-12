import { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
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
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CustomDialogContent from "components/atoms/Dialog/CustomDialogContent";
import CustomDialogActions from './Dialog/CustomDialogActions';
import CustomMenuItem from './Menu/CustomMenuItem';
import CustomMenu from './Menu/CustomMenu';
import Dialog from '@mui/material/Dialog';
import CustomDialogTitle from './CustomDialogTitle';


export const CustomAvatar = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
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
      <CustomMenu
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
        open={avatarOpen}
        arrowPositionRight={25}
        paperProps={{
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
        <CustomMenuItem onClick={() => dispatch(openProfileDialog())}>
          <ListItemIcon className='dark:text-white'>
            <AssignmentIndIcon/>
          </ListItemIcon>
          {t('general.common.profile')}
        </CustomMenuItem>
        <CustomMenuItem onClick={() => dispatch(openSettingDialog())}>
          <ListItemIcon className='dark:text-white'>
            <Settings/>
          </ListItemIcon>
          {t('general.common.setting')}
        </CustomMenuItem>
        <CustomMenuItem onClick={() => setOpenLogoutDialog(true)}>
          <ListItemIcon className='dark:text-white'>
            <Logout/>
          </ListItemIcon>
          {t('general.common.logout')}
        </CustomMenuItem>
      </CustomMenu>
      <Dialog
        open={openLogoutDialog} 
        aria-labelledby="password-logout-dialog" 
        onClose={() => setOpenLogoutDialog(false)}
      >
        <CustomDialogTitle 
          title={t('component.dialog.title.confirmLogout')}
          close={() => setOpenLogoutDialog(false)}
        />
        <CustomDialogContent>
          <DialogContentText className='text-black dark:text-white'>
            {t('component.dialog.explain.confirmLogoutMessage')}
          </DialogContentText>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button className='dark:text-white' onClick={() => setOpenLogoutDialog(false)}>
            {t('component.button.cancel')}
          </Button>
          <Button className='dark:text-white' onClick={handleLogout} color="primary" autoFocus>
            {t('component.button.logout')}
          </Button>
        </CustomDialogActions>
      </Dialog>
    </div>
  )
}

