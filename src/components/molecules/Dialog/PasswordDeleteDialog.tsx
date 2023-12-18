import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { changePasswords, closeDeletePasswordDialog, closeMinusButtonMenu } from 'redux/passwordManage/reducer';
import { getToken } from 'utils/auth';
import Button from '@mui/material/Button';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import { Password } from 'types/models/Password';
import Box from '@mui/material/Box';
import { deletePassword } from 'api/password/crud';
import CustomDialog from 'components/atoms/CustomDialog';
import CustomDialogTitle from 'components/atoms/CustomDialogTitle';
import CustomDialogContent from 'components/atoms/Dialog/CustomDialogContent';
import CustomDialogActions from 'components/atoms/Dialog/CustomDialogActions';
import CustomCheckBox from 'components/atoms/Input/CustomCheckBox';

type GetPassword = Omit<Password, '_id'> & { id: number };

const PasswordDeleteDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = getToken();
  const open = useSelector((state: RootState) => state.passwordManage.openDeletePasswordDialog);
  const passwords = useSelector((state: RootState) => state.passwordManage.passwords);
  const [selectedPasswords, setSelectedPasswords] = useState<number[]>([]);

  const handleClose = () => {
    dispatch(closeDeletePasswordDialog());
    dispatch(closeMinusButtonMenu());
  };

  const handleDelete = async () => {
    const allPasswords = Object.values(passwords).flat();

    try {
      for (const id of selectedPasswords) {
        const targetPassword = allPasswords.find((password) => password.id === id);
        let groupId = null;
        if (targetPassword && targetPassword.group) {
          groupId = targetPassword.group.id;
        }
        const data = { id: id, group: groupId };
        await deletePassword(data, token);
      }
      dispatch(changePasswords(true));
      setSelectedPasswords([]);
    } catch (error) {
      const alert: Alert = { message: '削除に失敗しました。管理者にお問い合わせください。', severity: 'error' };
      dispatch(addAlert(alert));
    }
  };

  const handlePasswordSelect = (event: React.ChangeEvent<HTMLInputElement>, passwordId: number) => {
    if (event.target.checked) {
      setSelectedPasswords([...selectedPasswords, passwordId]);
    } else {
      setSelectedPasswords(selectedPasswords.filter((id) => id !== passwordId));
    }
  };

  const handleCategoryClick = (key: string) => {
    const ids = passwords[key].map((item) => item.id);
    if (ids.every((id) => selectedPasswords.includes(id))) {
      setSelectedPasswords(selectedPasswords.filter((id) => !ids.includes(id)));
    } else {
      setSelectedPasswords([...Array.from(new Set([...selectedPasswords, ...ids]))]);
    }
  };

  return (
    <div>
      <CustomDialog
        params={{
          open: open,
          ariaLabelledBy: 'password-delete-dialog',
          close: () => handleClose(),
        }}
      >
        <CustomDialogTitle title={t('component.dialog.title.deletePassword')} close={() => handleClose()} />
        <CustomDialogContent>
          {Object.keys(passwords).map((key: string) => {
            const ids = passwords[key].map((item) => item.id);
            const allSelected = ids.length > 0 && ids.every((id) => selectedPasswords.includes(id));
            const indeterminate = ids.some((id) => selectedPasswords.includes(id)) && !allSelected;
            return (
              <Box key={key} sx={{ display: 'flex', flexDirection: 'column' }}>
                <CustomCheckBox
                  checked={allSelected}
                  indeterminate={indeterminate}
                  onChange={() => handleCategoryClick(key)}
                  label={key}
                />
                {passwords[key].map((item: GetPassword) => {
                  return (
                    <CustomCheckBox
                      key={item.id}
                      checked={selectedPasswords.includes(item.id)}
                      onChange={(event) => handlePasswordSelect(event, item.id)}
                      label={item.title}
                      marginLeft={2}
                    />
                  );
                })}
              </Box>
            );
          })}
        </CustomDialogContent>
        <CustomDialogActions>
          <Button onClick={handleDelete}>{t('component.button.delete')}</Button>
        </CustomDialogActions>
      </CustomDialog>
    </div>
  );
};

export default PasswordDeleteDialog;
