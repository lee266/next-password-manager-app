import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from 'utils/auth';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { RootState } from 'redux/rootReducer';
import { closeDetailDialog, deleteSelectedPassword, updateSelectedPassword } from 'redux/passwordManage/reducer';
import { Password, PasswordSchema } from 'types/models/Password';
import IconButton from '@mui/material/IconButton';
import ModeEditTwoTone from '@mui/icons-material/ModeEditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { deletePassword, updatePassword } from 'api/password/crud';
import CustomDialog from 'components/atoms/CustomDialog';
import CustomDialogTitle from 'components/atoms/CustomDialogTitle';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CustomDialogContent from 'components/atoms/Dialog/CustomDialogContent';
import CustomTextField from 'components/atoms/Input/CustomTextField';
import CustomTextArea from 'components/atoms/Input/CustomTextArea';
import CustomDialogActions from 'components/atoms/Dialog/CustomDialogActions';
import CustomSelect from 'components/atoms/Input/CustomSelect';
import CustomMenuItem from 'components/atoms/Menu/CustomMenuItem';

const PasswordDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openConfirmDialog, setConfirmDialog] = useState<boolean>(false);
  const selectBoxGroups = useSelector((state: RootState) => state.passwordManage.groups);
  const [oldGroup, setOldGroup] = useState<number | string | undefined>('');
  const selectBoxTags = useSelector((state: RootState) => state.passwordManage.tags);
  const token = getToken();
  const open = useSelector((state: RootState) => state.passwordManage.openDetailDialog);
  const selectedPassword = useSelector((state: RootState) => state.passwordManage.selectedPassword);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const selectedGroup = watch('group');
  const selectedTag = watch('tag');

  const handleClose = () => {
    dispatch(closeDetailDialog());
    setEditMode(false);
  };

  const onSubmit: SubmitHandler<Password> = async (data) => {
    try {
      setIsSubmitting(true);
      if (data['password']) {
        const response = await axios.post('/api/encrypt', { text: data['password'] });
        data['password'] = response.data['encryptedText'];
      }
      if (data.group != oldGroup) {
        await updatePassword(data, token, true);
      } else {
        await updatePassword(data, token, false);
      }
      // inform update for redux
      dispatch(updateSelectedPassword(true));
      handleClose();
    } catch (error) {
      const alert: Alert = { message: `${selectedPassword?.title}の更新に失敗しました。`, severity: 'error' };
      dispatch(addAlert(alert));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedPassword) {
        let groupId: number | null = null;
        if (selectedPassword.group && typeof selectedPassword.group === 'object' && selectedPassword.group.id) {
          groupId = selectedPassword.group.id;
        }
        await deletePassword({ id: selectedPassword.id, group: groupId }, token);
      }
      setConfirmDialog(false);
      dispatch(deleteSelectedPassword(true));
      handleClose();
    } catch (error) {
      const alert: Alert = { message: `${selectedPassword?.title}の削除に失敗しました。`, severity: 'error' };
      dispatch(addAlert(alert));
    }
  };

  useEffect(() => {
    if (open && selectedPassword) {
      setValue('id', selectedPassword.id);
      setValue('user', selectedPassword.user);
      setValue('title', selectedPassword.title);
      setValue('password', selectedPassword.password);
      setValue('email', selectedPassword.email);
      setValue('website', selectedPassword.website);
      setValue('notes', selectedPassword.notes);
      setValue(
        'tag',
        typeof selectedPassword.tag === 'object' && selectedPassword.tag !== null ? selectedPassword.tag.id : ''
      );
      setValue(
        'group',
        typeof selectedPassword.group === 'object' && selectedPassword.group !== null && 'id' in selectedPassword.group
          ? selectedPassword.group.id
          : ''
      );
      setOldGroup(
        selectedPassword.group && typeof selectedPassword.group === 'object' && 'id' in selectedPassword.group
          ? selectedPassword.group.id
          : ''
      );
    }
  }, [selectedPassword, open]);

  return (
    <div className="password-detail-dialog">
      <CustomDialog
        params={{
          open: open,
          ariaLabelledBy: 'password-detail-dialog',
          close: () => handleClose(),
        }}
      >
        <CustomDialogTitle title={t('component.dialog.title.passwordDetail')} close={() => handleClose()} />
        <CustomDialogContent>
          <form id="password-detail-form" onSubmit={handleSubmit(onSubmit)} autoComplete="password-detail">
            <CustomTextField
              id="title"
              label={t('component.form.title') + '*'}
              error={errors.title}
              register={register}
              inputProps={{ readOnly: !editMode }}
            />
            <CustomTextField
              id="password"
              label={t('component.form.password')}
              error={errors.password}
              register={register}
              inputProps={{ readOnly: !editMode }}
            />
            <CustomTextField
              id="email"
              label={t('component.form.email')}
              register={register}
              error={errors.email}
              inputProps={{ readOnly: !editMode }}
            />
            <CustomTextField
              id="website"
              label={t('component.form.website')}
              register={register}
              error={errors.website}
              inputProps={{ readOnly: !editMode }}
            />
            <CustomSelect
              id="tag"
              label={t('component.form.tag')}
              register={register}
              error={errors.tag}
              value={selectedTag}
              inputProps={{ readOnly: !editMode }}
            >
              <CustomMenuItem value={''}>{'None'}</CustomMenuItem>
              {selectBoxTags.map((tag) => (
                <CustomMenuItem key={tag.id} value={tag.id}>
                  {tag.tag_name}
                </CustomMenuItem>
              ))}
            </CustomSelect>
            <CustomSelect
              id="group"
              label={t('component.form.group')}
              register={register}
              error={errors.group}
              value={selectedGroup}
              inputProps={{ readOnly: !editMode }}
            >
              <CustomMenuItem value={''}>{'None'}</CustomMenuItem>
              {selectBoxGroups.map((group) => (
                <CustomMenuItem key={group.id} value={group.id}>
                  {group.group_name}
                </CustomMenuItem>
              ))}
            </CustomSelect>
            <CustomTextArea
              id="note"
              label={t('component.form.note')}
              rows={7}
              register={register}
              error={errors.notes}
              inputProps={{ readOnly: !editMode, ...register('notes') }}
            />
          </form>
        </CustomDialogContent>
        <CustomDialogActions>
          {!editMode ? (
            <div>
              <IconButton aria-label="Edit button" onClick={() => setEditMode(true)}>
                <ModeEditTwoTone color="primary" />
              </IconButton>
              <IconButton arial-label="Delete button" onClick={() => setConfirmDialog(true)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          ) : (
            <div>
              <Button onClick={() => setEditMode(false)}>{t('component.button.cancel')}</Button>
              {isSubmitting ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                <Button type="submit" form="password-detail-form">
                  {t('component.button.update')}
                </Button>
              )}
            </div>
          )}
        </CustomDialogActions>
      </CustomDialog>

      {/* Dialog of confirming delete a password  */}
      <Dialog open={openConfirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>{t('Confirm cancellation')}</DialogTitle>
        <CustomDialogContent>
          <DialogContentText>{t('Are you sure you want to cancel the changes?')}</DialogContentText>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button onClick={() => setConfirmDialog(false)}>{t('component.button.no')}</Button>
          <Button onClick={handleDelete} color="primary">
            {t('component.button.yes')}
          </Button>
        </CustomDialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordDetail;
