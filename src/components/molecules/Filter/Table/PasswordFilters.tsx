import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { openAddDialog, openGroupDialog, openTagDialog } from 'redux/passwordManage/reducer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';


const PasswordFilters = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

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

  const openDialog = (dialogType: string) => {
    if(dialogType === 'group'){
      dispatch(openGroupDialog());
    } else if(dialogType === 'tag') {
      dispatch(openTagDialog());
    }else{
      dispatch(openAddDialog());
    }
  }

  return(
    <div className='password-filters'>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ flexGrow: 1 }} />
        <Fab className="bg-primary" size='small' color='primary' aria-label='add-password' 
          onClick={handleClick}
        >
          <AddIcon 
            style={{ 
              transform: `${open ? 'rotate(45deg)' : 'rotate(0deg)'}`, 
              transition: 'transform 0.3s' 
            }}/>
        </Fab>
        <Menu
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
        open={open}
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
        <Fab className="bg-primary" size='small' color='primary' aria-label='search-button'
          onClick={handleClick}
        >
          <SearchIcon />
        </Fab>
      </Box>
    </div>
  )
}

export default PasswordFilters;
