import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from 'utils/auth';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { RootState } from 'redux/rootReducer';
import { closeDetailDialog, deleteSelectedPassword, updateSelectedPassword } from 'redux/passwordManage/reducer';
import { Password, PasswordSchema } from 'types/models/Password';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditTwoTone  from '@mui/icons-material/ModeEditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DialogContentText } from '@mui/material';
import { deletePassword, updatePassword } from 'api/password/crud';


const PasswordDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openConfirmDialog, setConfirmDialog] = useState<boolean>(false);
  const selectBoxGroups = useSelector((state: RootState) => state.passwordManage.groups);
  const [oldGroup, setOldGroup] = useState<number|string|undefined>('');
  const selectBoxTags = useSelector((state: RootState) => state.passwordManage.tags);
  const token = getToken();
  const open = useSelector((state: RootState) => state.passwordManage.openDetailDialog);
  const selectedPassword = useSelector((state: RootState) => state.passwordManage.selectedPassword);

  const form = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { 
      id: -1,
      user: -1, 
      title: '',
      password: '',
      email: '',
      website: '',
      notes: '',
      tag: '',
      group: '',
    }
  })
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const selectedGroup = watch('group');
  const selectedTag = watch('tag');

  const handleClose = () => { 
    dispatch(closeDetailDialog());
    setEditMode(false);
  }
  const onSubmit: SubmitHandler<Password> =async (data) => {
    console.log('onSubmit');
    console.log(data);
    try {
      if (data.group != oldGroup) {
        await updatePassword(data, token, true);
      }else{
        await updatePassword(data, token, false);
      }
      // inform update for redux 
      dispatch(updateSelectedPassword(true))
      handleClose();
    } catch (error) {
      const alert: Alert = {message: `${selectedPassword?.title}の更新に失敗しました。`, severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  const handleDelete = async () => {
    console.log("delete");
    try {
      if (selectedPassword) {
        let groupId: number|null = null;
        if (selectedPassword.group && typeof selectedPassword.group === 'object' && selectedPassword.group.id) {
          groupId = selectedPassword.group.id;
        }
        await deletePassword({'id': selectedPassword.id, 'group': groupId}, token);
      }
      setConfirmDialog(false);
      dispatch(deleteSelectedPassword(true));
      handleClose();
    } catch (error) {
      const alert: Alert = {message: `${selectedPassword?.title}の削除に失敗しました。`, severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  useEffect(() => {
    if (open && selectedPassword) {
      setValue("id", selectedPassword.id);
      setValue("user", selectedPassword.user);
      setValue("title", selectedPassword.title);
      setValue("password", selectedPassword.password);
      setValue("email", selectedPassword.email);
      setValue("website", selectedPassword.website);
      setValue("notes", selectedPassword.notes);
      setValue("tag", typeof selectedPassword.tag === 'object' && selectedPassword.tag !== null ? selectedPassword.tag.id : '');
      setValue("group", typeof selectedPassword.group === 'object' && selectedPassword.group !== null && 'id' in selectedPassword.group ? selectedPassword.group.id : '');
      setOldGroup(
        selectedPassword.group && typeof selectedPassword.group === 'object' && 'id' in selectedPassword.group 
          ? selectedPassword.group.id 
          : ''
      )
    }
  }, [selectedPassword, open]);

  return(
    <div className='password-detail-dialog'>
      <Dialog fullScreen open={open} aria-labelledby='password-detail-dialog' scroll='paper'
        onClose={() => handleClose()}
      >
        <DialogTitle id='password-manage-detail-dialog'>
          {t("component.dialog.title.passwordDetail")}
          <IconButton aria-label='close' sx={{position: 'absolute',right: 8,top: 8,}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <form id='password-detail-form' onSubmit={handleSubmit(onSubmit)} autoComplete='password-detail'>
            <TextField
              label={t('component.form.title')  + '*'}
              margin='normal'
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              InputProps={{ readOnly: !editMode, }}
            />
            <TextField
              id='password'
              label={t('component.form.password') + '*'}
              margin='normal'
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{ readOnly: !editMode, }}
            />
            <TextField
              id='email'
              label={t('component.form.email')}
              margin='normal'
              fullWidth
              type='email'
              autoComplete='email'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{ readOnly: !editMode, }}
            />
            <TextField
              id='website'
              label={t('component.form.website')}
              margin='normal'
              fullWidth
              autoComplete='website url'
              {...register('website')}
              error={!!errors.website}
              helperText={errors.website?.message}
              InputProps={{ readOnly: !editMode, }}
            />
            <FormControl className='mt-2' fullWidth >
              <InputLabel id='tag'>{t('component.form.tag')}</InputLabel>
              <Select
                id='tag'
                label='Age'
                fullWidth
                {...register('tag')}
                error={!!errors.tag}
                value={selectedTag}
                inputProps={{ readOnly: !editMode }}
              >
                <MenuItem value={''}>{'None'}</MenuItem>
                {selectBoxTags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>{tag.tag_name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.tag?.message}</FormHelperText>
            </FormControl>
            <FormControl className='mt-4' fullWidth>
              <InputLabel id='groups'>{t('component.form.group')}</InputLabel>
              <Select
                id='groups'
                label={t('component.form.group')}
                fullWidth
                {...register('group')}
                error={!!errors.group}
                value={selectedGroup}
                inputProps={{ readOnly: !editMode }}
              >
                <MenuItem value={''}>{'None'}</MenuItem>
                {selectBoxGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>{group.group_name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.group?.message}</FormHelperText>
            </FormControl>
            <TextField
              id='notes'
              label={t('component.form.note')}
              multiline
              margin='normal'
              fullWidth
              rows={7}
              autoComplete='notes'
              {...register('notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              InputProps={{ readOnly: !editMode, ...register('notes'),}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {!editMode ? (
            <div>
              <IconButton aria-label="Edit button" onClick={() => setEditMode(true)}>
                <ModeEditTwoTone color="primary" />
              </IconButton>
              <IconButton arial-label='Delete button' onClick={() => setConfirmDialog(true)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          ) : (
            <div>
              <Button onClick={() => setEditMode(false)}>{t("component.button.cancel")}</Button>
              <Button type='submit' form='password-detail-form'>{t("component.button.update")}</Button>
            </div>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog of confirming delete a password  */}
      <Dialog open={openConfirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>{t("Confirm cancellation")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to cancel the changes?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>
            {t("component.button.no")}
          </Button>
          <Button onClick={handleDelete} color="primary">
            {t("component.button.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PasswordDetail;
