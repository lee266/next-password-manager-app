import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeAddDialog, closePlusButtonMenu, changePasswords } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { getToken } from 'utils/auth';
import { Password, PasswordSchema } from 'types/models/Password';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddButton from 'components/atoms/Button/AddButton';
import { createPassword } from 'api/password/crud';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";
import axios from 'axios';
import { useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";


const PasswordAddDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = getToken();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectBoxGroups = useSelector((state: RootState) => state.passwordManage.groups);
  const selectBoxTags = useSelector((state: RootState) => state.passwordManage.tags);
  const open = useSelector((state: RootState) => state.passwordManage.openAddDialog);
  // react form settings
  const form = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { 
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
  const { register, handleSubmit, formState: { errors }, reset } = form;
  
  const handleClose = () => { 
    dispatch(closeAddDialog());
    dispatch(closePlusButtonMenu());
    reset(); 
  }

  const onSubmit: SubmitHandler<Password> = async(data) => {
    try { 
      setIsSubmitting(true);
      const [user, encryptedPassword] = await Promise.all([
        getUser(token),
        data['password'] ? axios.post('/api/encrypt', {text: data['password']}) : null
      ]);
  
      data['user'] = user.id;
  
      if (encryptedPassword) {
        data['password'] = encryptedPassword.data['encryptedText'];
      }
  
      await createPassword(data, token);
      reset();
      dispatch(changePasswords(true));
    } catch (error) {
      const alert: Alert = {message: "パスワード作成に失敗しました。", severity: 'error',}
      dispatch(addAlert(alert));
    }finally {
      setIsSubmitting(false);
    }
  }

  return(
    <div className='password-add-dialog'>
      <CustomDialog params={{
        open: open, 
        ariaLabelledBy: "password-add-dialog", 
        close: () => handleClose()
      }}>
        <CustomDialogTitle
          title={t('component.dialog.title.addPassword')}
          close={() => handleClose()}
        />
        <DialogContent dividers>
          <form id='password-form' onSubmit={handleSubmit(onSubmit)} autoComplete='new-password'>
            <TextField
              label={t('component.form.title')  + '*'}
              margin='normal'
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              id='password'
              label={t('component.form.password')}
              margin='normal'
              fullWidth
              type='password'
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              id='email'
              label={t('component.form.email')}
              margin='normal'
              fullWidth
              autoComplete='email'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
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
            />
            <FormControl className='mt-2' fullWidth>
              <InputLabel id='tag'>{t('component.form.tag')}</InputLabel>
              <Select
                id='tag'
                label='Age'
                fullWidth
                {...register('tag')}
                error={!!errors.tag}
                defaultValue=''
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
                defaultValue=''
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
              maxRows={4}
              autoComplete='notes'
              {...register('notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {isSubmitting ? 
            <CircularProgress size={24} color="primary" /> : <AddButton name={t('component.button.add')} form='password-form' type='submit' />
          }
        </DialogActions>
      </CustomDialog>
    </div>
  )
}

export default PasswordAddDialog;
