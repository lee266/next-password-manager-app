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
import AddButton from 'components/atoms/Button/AddButton';
import { createPassword } from 'api/password/crud';
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";
import axios from 'axios';
import { useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import CustomDialogContent from "components/atoms/Dialog/CustomDialogContent";
import CustomTextField from 'components/atoms/Input/CustomTextField';
import CustomTextArea from 'components/atoms/Input/CustomTextArea';
import CustomDialogActions from 'components/atoms/Dialog/CustomDialogActions';
import CustomSelect from 'components/atoms/Input/CustomSelect';
import CustomMenuItem from 'components/atoms/Menu/CustomMenuItem';


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
        <CustomDialogContent>
          <form id='password-form' onSubmit={handleSubmit(onSubmit)} autoComplete='new-password'>
            <CustomTextField
              id='title'
              label={t('component.form.title')  + '*'}
              error={errors.title}
              register={register}
            />
            <CustomTextField
              id='password'
              label={t('component.form.password')}
              register={register}
              type='password'
              error={errors.password}
            />
            <CustomTextField
              id='email'
              label={t('component.form.email')}
              register={register}
              error={errors.email}
            />
            <CustomTextField
              id='website'
              label={t('component.form.website')}
              register={register}
              error={errors.website}
            />
            <CustomSelect
              id='tag'
              label={t('component.form.tag')}
              register={register}
              error={errors.tag}
            >
              <CustomMenuItem value={''}>{'None'}</CustomMenuItem>
              {selectBoxTags.map((tag) => (
                <CustomMenuItem key={tag.id} value={tag.id}>{tag.tag_name}</CustomMenuItem>
              ))}
            </CustomSelect>
            <CustomSelect
              id='group'
              label={t('component.form.group')}
              register={register}
              error={errors.group}
            >
              <CustomMenuItem value={''}>{'None'}</CustomMenuItem>
              {selectBoxGroups.map((group) => (
                <CustomMenuItem key={group.id} value={group.id}>{group.group_name}</CustomMenuItem>
              ))}
            </CustomSelect>
            <CustomTextArea
              id='notes'
              label={t('component.form.note')}
              register={register}
              error={errors.notes}
            />
          </form>
        </CustomDialogContent>
        <CustomDialogActions>
          {isSubmitting ? 
            <CircularProgress size={24} color="primary" /> : <AddButton name={t('component.button.add')} form='password-form' type='submit' />
          }
        </CustomDialogActions>
      </CustomDialog>
    </div>
  )
}

export default PasswordAddDialog;
