import { useDispatch } from 'react-redux';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { OpenAddDialog } from 'redux/passwordManage/reducer';


const PasswordFilters = () => {
  const dispatch = useDispatch();

  const handleOpenAdd = () => {
    dispatch(OpenAddDialog())
  }

  const handleColumns = () => {
    console.log("columns");
  }

  return(
    <div className='password-filters'>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ flexGrow: 1 }} />
        <Fab className="bg-primary" variant="extended" size='small' color='primary' aria-label='add-password' onClick={handleOpenAdd}>
          <AddIcon sx={{ mr:0.5 }}/>
          password
        </Fab>
        <Fab className='bg-primary' variant='extended' size='small' color='primary' aria-label='add-group'>
          <AddIcon sx={{ mr:0.5 }}/>
          Group
        </Fab>
        <Fab className='bg-primary' variant='extended' size='small' color='primary' aria-label='add-group'>
          <AddIcon sx={{ mr:0.5 }}/>
          tag
        </Fab>
        <Fab className="bg-primary" variant="extended" size='small' color='primary' aria-label='add' 
          onClick={handleColumns}
          sx={{ ml:1}}
        >
          Setting of columns
        </Fab>
      </Box>
    </div>
  )
}

export default PasswordFilters;
