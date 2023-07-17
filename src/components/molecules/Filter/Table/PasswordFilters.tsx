import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from "next-i18next";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { 
  changePasswordFilters,
  closeMinusButtonMenu, closePlusButtonMenu, openAddDialog, 
  openDeleteGroupDialog, openDeletePasswordDialog, openDeleteTagDialog, openGroupDialog, 
  openMinusButtonMenu, openPlusButtonMenu, openSearchDialog, openTagDialog, resetPasswordFilters 
} from 'redux/passwordManage/reducer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';


const PasswordFilters = () => {
  const { t } = useTranslation();
  const [anchorElAdd, setAnchorElAdd] = useState<null | HTMLElement>(null);
  const [anchorElDelete, setAnchorElDelete] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const openAdd = useSelector((state: RootState) => state.passwordManage.openPlusButtonMenu);
  const openDelete = useSelector((state: RootState) => state.passwordManage.openMinusButtonMenu);

  const handleClickAdd = useCallback((
    event: React.MouseEvent<HTMLElement>
    ) => {
      setAnchorElAdd(event.currentTarget);
      dispatch( openPlusButtonMenu() );
    }, []
  );
  
  const handleClickDelete = useCallback((
    event: React.MouseEvent<HTMLElement>
    ) => {
      setAnchorElDelete(event.currentTarget);
      dispatch( openMinusButtonMenu() );
    }, []
  );

  const handleCloseAdd = useCallback(() => {
    setAnchorElAdd(null);
    dispatch( closePlusButtonMenu() );
  }, []);
  
  const handleCloseDelete = useCallback(() => {
    setAnchorElDelete(null);
    dispatch( closeMinusButtonMenu() );
  }, []);

  const searchReset = () => {
    dispatch( resetPasswordFilters() );
    dispatch( changePasswordFilters(true) );
  }

  const openDialog = (dialogType: string) => {
    if(dialogType === 'group'){
      dispatch(openGroupDialog());
    }else if(dialogType === 'tag') {
      dispatch(openTagDialog());
    }else if (dialogType === 'deleteTag') {

    }else{ dispatch(openAddDialog()); }
  }

  return(
    <div className='password-filters mt-1'>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ flexGrow: 1 }} />
        {/* plus button  */}
        <Fab className="bg-primary" size='small' color='primary' aria-label='add-password' 
          onClick={handleClickAdd}
        >
          <AddIcon 
            style={{ 
              transform: `${openAdd ? 'rotate(45deg)' : 'rotate(0deg)'}`, 
              transition: 'transform 0.3s' 
            }}/>
        </Fab>
        <Menu
          onClose={handleCloseAdd}
          anchorEl={anchorElAdd}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openAdd}
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
                mr: 10,
              },
            },
          }}
        >
          <MenuItem onClick={() => openDialog('add')}>
            {t("component.menu.createPassword")}
          </MenuItem>
          <MenuItem onClick={() => openDialog('group')}>
            {t("component.menu.createGroup")}
          </MenuItem>
          <MenuItem onClick={() => openDialog('tag')}>
            {t("component.menu.createTag")}
          </MenuItem>
        </Menu>
        {/* minus button  */}
        <Fab className="bg-primary" size='small' color='primary' aria-label='minus-button'
          onClick={handleClickDelete}
        >
          <RemoveIcon />
        </Fab>
        <Menu
          onClose={handleCloseDelete}
          anchorEl={anchorElDelete}
          open={openDelete}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            },
        }}>
          
          <MenuItem onClick={() => dispatch(openDeletePasswordDialog())}> {t("component.menu.deletePassword")} </MenuItem>
          <MenuItem onClick={() => dispatch(openDeleteGroupDialog())}> {t("component.menu.deleteGroup")} </MenuItem>
          <MenuItem onClick={() => dispatch(openDeleteTagDialog())}> {t("component.menu.deleteTag")} </MenuItem>
        </Menu>
        {/* search button  */}
        <Fab className="bg-primary" size='small' color='primary' aria-label='search-button'
          onClick={() => dispatch(openSearchDialog())}
        >
          <SearchIcon />
        </Fab>
        {/* search reset button  */}
        <Fab className="bg-primary" size='small' color='primary' aria-label='search-reset-button'
          onClick={searchReset}
        >
          <SearchOffIcon />
        </Fab>
      </Box>
    </div>
  )
}

export default PasswordFilters;
