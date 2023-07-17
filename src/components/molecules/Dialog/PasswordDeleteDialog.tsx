import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "redux/rootReducer";
import { changePasswords, closeDeletePasswordDialog, closeMinusButtonMenu } from "redux/passwordManage/reducer";
import { getToken } from 'utils/auth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import { Password } from "types/models/Password";
import Box from '@mui/material/Box';
import { deletePassword } from "api/password/crud";


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
  }

  const handleDelete = async() => {
    const allPasswords = Object.values(passwords).flat();
    
    try {
      for (const id of selectedPasswords) {
        const targetPassword = allPasswords.find(password => password.id === id);
        let groupId = null;
        if (targetPassword && targetPassword.group) {
          groupId = targetPassword.group.id;
        }
        const data = {'id': id, 'group': groupId}
        await deletePassword(data, token);
      }
      dispatch( changePasswords(true) );
      setSelectedPasswords([]);
    } catch (error) {
      const alert: Alert = {message: "削除に失敗しました。管理者にお問い合わせください。", severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  const handlePasswordSelect = (event: React.ChangeEvent<HTMLInputElement>, passwordId: number) => {
    if (event.target.checked) {
      setSelectedPasswords([...selectedPasswords, passwordId]);
    } else {
      setSelectedPasswords(selectedPasswords.filter(id => id !== passwordId));
    }
  };

  const handleCategoryClick = (key: string) => {
    const ids = passwords[key].map(item => item.id);
    if (ids.every(id => selectedPasswords.includes(id))) {
      setSelectedPasswords(selectedPasswords.filter(id => !ids.includes(id)));
    } else {
      setSelectedPasswords([...Array.from(new Set([...selectedPasswords, ...ids]))]);
    }
  };

  return(
    <div>
      <Dialog fullScreen open={open} aria-labelledby='password-delete-dialog' scroll='paper'
        onClose={() => handleClose()}
      >
        <DialogTitle id='password-delete-dialog'>
          {t('component.dialog.title.deletePassword')}
          <IconButton aria-label='close' sx={{position: 'absolute',right: 8,top: 8,}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {Object.keys(passwords).map((key:string) => {
            const ids = passwords[key].map(item => item.id);
            const allSelected = ids.length > 0 && ids.every(id => selectedPasswords.includes(id));
            const indeterminate = ids.some(id => selectedPasswords.includes(id)) && !allSelected;
            return (
              <Box key={key} sx={{ display: 'flex', flexDirection: 'column'}}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allSelected}
                      indeterminate={indeterminate}
                      onChange={() => handleCategoryClick(key)}
                    />
                  }
                  label={key}
                  sx={{ mb: -1 }}
                />
                {passwords[key].map((item: GetPassword) => {
                  return (
                    <FormControlLabel
                      key={item.id}
                      sx={{ marginLeft: 2, mb: -1 }}
                      control={
                        <Checkbox
                          checked={selectedPasswords.includes(item.id)}
                          onChange={(event) => handlePasswordSelect(event, item.id)}
                        />
                      }
                      label={item.title}
                    />
                  );
                })}
              </Box>
              )
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>{t("component.button.delete")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PasswordDeleteDialog;
