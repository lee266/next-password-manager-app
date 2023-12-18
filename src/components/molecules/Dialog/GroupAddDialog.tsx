import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeGroupDialog, closePlusButtonMenu, updateGroup } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { createGroup } from 'api/password/group';
import { getToken } from 'utils/auth';
import { PasswordGroup, PasswordGroupSchema } from 'types/models/Password';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import AddButton from 'components/atoms/Button/AddButton';
import CustomDialog from 'components/atoms/CustomDialog';
import CustomDialogTitle from 'components/atoms/CustomDialogTitle';
import CustomDialogContent from 'components/atoms/Dialog/CustomDialogContent';
import CustomDialogActions from 'components/atoms/Dialog/CustomDialogActions';
import CustomTextField from 'components/atoms/Input/CustomTextField';
import CustomTypography from 'components/atoms/Text/CustomTypography';
import CustomBox from 'components/atoms/CustomBox';

const GroupAddDialog = () => {
  const { t } = useTranslation();
  const token = getToken();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openGroupDialog);
  const groups = useSelector((state: RootState) => state.passwordManage.groups);

  // react form settings
  const form = useForm<PasswordGroup>({
    resolver: zodResolver(PasswordGroupSchema),
    defaultValues: { user: -1, group_name: '' },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const handleClose = () => {
    dispatch(closeGroupDialog());
    dispatch(closePlusButtonMenu());
    reset();
  };

  const onSubmit: SubmitHandler<PasswordGroup> = async (data) => {
    try {
      const user = await getUser(token);
      data['user'] = user.id;
      await createGroup(data, token);
      dispatch(updateGroup(true));
      reset();
    } catch (error) {
      const alert: Alert = {
        message: t('general.error.addGroup'),
        severity: 'error',
      };
      dispatch(addAlert(alert));
    }
  };

  return (
    <div className="group-add-dialog ">
      <CustomDialog
        params={{
          open: open,
          ariaLabelledBy: 'group-add-dialog',
          close: () => handleClose(),
        }}
      >
        <CustomDialogTitle title={t('component.dialog.title.addGroup')} close={() => handleClose()} />
        <CustomDialogContent>
          <form id="group-form" onSubmit={handleSubmit(onSubmit)} autoComplete="new-group">
            <CustomTextField id="group_name" label="Group name*" register={register} error={errors.group_name} />
            <CustomTypography variant="subtitle1">現在存在するグループ</CustomTypography>
            <CustomBox maxHeight={'18em'}>
              {groups.map((group, index) => {
                return (
                  <CustomTypography marginTop={1} variant="body2" key={index}>
                    {group.group_name}
                  </CustomTypography>
                );
              })}
            </CustomBox>
          </form>
        </CustomDialogContent>
        <CustomDialogActions>
          <AddButton name={t('component.button.add')} form="group-form" type="submit" />
        </CustomDialogActions>
      </CustomDialog>
    </div>
  );
};

export default GroupAddDialog;
