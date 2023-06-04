import { RootState } from 'redux/rootReducer';
import { OpenAddDialog } from 'redux/passwordManage/reducer';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddButton from 'components/atoms/Button/AddButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordGroupSchema, type PasswordGroup } from 'types/models/Password';
import { getUser } from 'api/users/crud';
import { getToken } from 'utils/auth';

const PasswordGroupAddDialog = () => {
  const open = useSelector((state: RootState) => state.passwordManage.openAddDialog);
  const token = getToken();
  const user = getUser(token);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(OpenAddDialog());
    console.log("ok");
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordGroup>({
    resolver: zodResolver(PasswordGroupSchema),
    defaultValues: {
      user: 9999999,
      group_name: '',
    }
  })

  return(
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="password-group-add-dialog"
    >
      <DialogTitle id="password-group-add-dialog">
          {"Add password"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{position: 'absolute',right: 8,top: 8,}}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <AddButton
              name='add'
              form=''
              click={handleClose}
            />
          </DialogActions>
        </form>
    </Dialog>
  )
}

export default PasswordGroupAddDialog;
