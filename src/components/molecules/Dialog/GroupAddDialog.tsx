import { useTranslation } from "next-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeGroupDialog, closePlusButtonMenu, updateGroup } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { createGroup } from 'api/password/group';
import { getToken } from 'utils/auth';
import { PasswordGroup, PasswordGroupSchema } from 'types/models/Password';
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddButton from 'components/atoms/Button/AddButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const GroupAddDialog = () => {
  const { t } = useTranslation();
  const token = getToken();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openGroupDialog);
  const groups = useSelector((state: RootState) => state.passwordManage.groups);

  // react form settings
  const form = useForm<PasswordGroup>({
    resolver: zodResolver(PasswordGroupSchema),
    defaultValues: { user: -1, group_name: ""}
  })
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const handleClose = () => { 
    dispatch(closeGroupDialog());
    dispatch(closePlusButtonMenu());
    reset(); 
  }

  const onSubmit: SubmitHandler<PasswordGroup> = async(data) => {
    try { 
      const user = await getUser(token);
      data["user"] = user.id;
      await createGroup(data, token);
      dispatch( updateGroup(true) );
      reset();
    } catch (error) {
      const alert: Alert = {
        message: t('general.error.addGroup'),
        severity: "error",
      }
      dispatch(addAlert(alert));
    }
  }

  return(
    <div className="group-add-dialog">
      <Dialog fullScreen open={open} aria-labelledby="group-add-dialog" onClose={() => handleClose()}>
        <DialogTitle id="password-manage-add-dialog">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{t("component.dialog.title.addGroup")}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <form id="group-form" onSubmit={handleSubmit(onSubmit)} autoComplete='new-group'>
            <TextField 
              label="Group name*"
              margin='normal'
              fullWidth
              {...register('group_name')}
              error={!!errors.group_name}
              helperText={errors.group_name?.message}
            />
            <Typography variant="subtitle1" className="mt-3">現在存在するグループ</Typography>
            <Box bgcolor="#f0f0f0" p={1} my={2} style={{ maxHeight: '16em', overflowY: 'auto', lineHeight: '1em' }}>
              {groups.map((group, index) => {
                return(<Typography variant="body2" key={index}>{group.group_name}</Typography>)
              })}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <AddButton name={t('component.button.add')} form='group-form' type="submit" />
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default GroupAddDialog;
