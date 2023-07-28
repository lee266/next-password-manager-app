import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type CustomDialogTitleProps = {
  title: string;
  close: () => void;
}

const CustomDialogTitle: React.FC<CustomDialogTitleProps>  = ({ title, close }) => {
  return(
    <>
      <DialogTitle id='setting-dialog' className='bg-primary dark:bg-primary-dark'>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{position: 'relative'}}
        > 
          {/* Max length of title is 20 */}
          <h2 className='text-ellipsis max-w-[20ch]'>{title}</h2>
          <IconButton aria-label='close-icon' onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
    </>
  )
}

export default CustomDialogTitle;
