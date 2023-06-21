import { useTranslation } from "next-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeTagDialog, addTag } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { createTag } from "api/password/tag";
import { getToken } from 'utils/auth';
import { PasswordTag, PasswordTagSchema } from 'types/models/Password';
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


const TagAddDialog = () => {
  const { t } = useTranslation();
  const token = getToken();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openTagDialog);
  // react form settings
  const form = useForm<PasswordTag>({
    resolver: zodResolver(PasswordTagSchema),
    defaultValues: { user: 99999999, tag_name: ""}
  })
  const { register, handleSubmit, formState: { errors } } = form;

  const handleClose = () => { dispatch(closeTagDialog()); }

  const onSubmit: SubmitHandler<PasswordTag> = async(data) => {
    try { 
      const user = await getUser(token);
      data["user"] = user.id;
      await createTag(data, token);
      dispatch(addTag(data.tag_name));
      handleClose();
    } catch (error) {
      const alert: Alert = {
        message: "グループが既に存在しているか、エラーが発生しました。",
        severity: "error",
      }
      dispatch(addAlert(alert));
    }
  }

  return(
    <div className="group-add-dialog">
      <Dialog open={open} aria-labelledby="group-add-dialog" onClose={() => handleClose()}>
        <DialogTitle id="password-manage-add-dialog">
          {t("Add Tag")}
          <IconButton aria-label="close" sx={{position: 'absolute',right: 8,top: 8,}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form id="group-form" onSubmit={handleSubmit(onSubmit)} autoComplete='new-group'>
          <DialogContent>
            <TextField 
              required 
              label="Tag name"
              {...register('tag_name')}
              error={!!errors.tag_name}
              helperText={errors.tag_name?.message}
            />
          </DialogContent>
          <DialogActions>
            <AddButton name={t('add')} form='group-form' type="submit" />
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default TagAddDialog;
