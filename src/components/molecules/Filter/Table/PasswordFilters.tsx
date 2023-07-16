import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { closeMinusButtonMenu, closePlusButtonMenu, openAddDialog, openDeleteTagDialog, openGroupDialog, openMinusButtonMenu, openPlusButtonMenu, openSearchDialog, openTagDialog } from 'redux/passwordManage/reducer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';


const PasswordFilters = () => {
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
    console.log("reset");
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
    <div className='password-filters'>
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
            Create new password
          </MenuItem>
          <MenuItem onClick={() => openDialog('group')}>
            Create new Group 
          </MenuItem>
          <MenuItem onClick={() => openDialog('tag')}>
            Create new tag
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
          <MenuItem onClick={() => openDialog('delete_group')}> Delete group </MenuItem>
          <MenuItem onClick={() => dispatch(openDeleteTagDialog())}> Delete tag </MenuItem>
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
