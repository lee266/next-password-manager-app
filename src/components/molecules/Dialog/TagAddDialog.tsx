import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closePlusButtonMenu, closeTagDialog, updateTag } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { createTag } from 'api/password/tag';
import { getToken } from 'utils/auth';
import { PasswordTag, PasswordTagSchema } from 'types/models/Password';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import AddButton from 'components/atoms/Button/AddButton';
import CustomDialog from 'components/atoms/CustomDialog';
import CustomDialogTitle from 'components/atoms/CustomDialogTitle';
import CustomDialogContent from 'components/atoms/Dialog/CustomDialogContent';
import CustomTextField from 'components/atoms/Input/CustomTextField';
import CustomDialogActions from 'components/atoms/Dialog/CustomDialogActions';
import CustomTypography from 'components/atoms/Text/CustomTypography';
import CustomBox from 'components/atoms/CustomBox';

const TagAddDialog = () => {
  const { t } = useTranslation();
  const token = getToken();
  const tags = useSelector((state: RootState) => state.passwordManage.tags);
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openTagDialog);
  // react form settings
  const form = useForm<PasswordTag>({
    resolver: zodResolver(PasswordTagSchema),
    defaultValues: { user: -1, tag_name: '' },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const handleClose = () => {
    dispatch(closeTagDialog());
    dispatch(closePlusButtonMenu());
    reset();
  };

  const onSubmit: SubmitHandler<PasswordTag> = async (data) => {
    try {
      const user = await getUser(token);
      data['user'] = user.id;
      await createTag(data, token);
      dispatch(updateTag(true));
      reset();
    } catch (error) {
      const alert: Alert = {
        message: 'エラーが発生しました。タグに既に存在している場合は追加できません。',
        severity: 'error',
      };
      dispatch(addAlert(alert));
      reset();
    }
  };

  return (
    <div className="tag-add-dialog">
      <CustomDialog
        params={{
          open: open,
          ariaLabelledBy: 'group-delete-dialog',
          close: () => handleClose(),
        }}
      >
        <CustomDialogTitle title={t('component.dialog.title.addTag')} close={() => handleClose()} />
        <CustomDialogContent>
          <form id="tag-form" onSubmit={handleSubmit(onSubmit)} autoComplete="new-tag">
            <CustomTextField id="tag_name" label="Tag name*" register={register} error={errors.tag_name} />
            <CustomTypography variant="subtitle1">現在存在するタグ</CustomTypography>
            <CustomBox maxHeight={'18em'}>
              {tags.map((tag, index) => {
                return (
                  <CustomTypography marginTop={1} variant="body2" key={index}>
                    {tag.tag_name}
                  </CustomTypography>
                );
              })}
            </CustomBox>
          </form>
        </CustomDialogContent>
        <CustomDialogActions>
          <AddButton name={t('component.button.add')} form="tag-form" type="submit" />
        </CustomDialogActions>
      </CustomDialog>
    </div>
  );
};

export default TagAddDialog;
