import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "redux/rootReducer";
import { closeDeleteGroupDialog, closeMinusButtonMenu, updateGroup } from "redux/passwordManage/reducer";
import { getToken } from 'utils/auth';
import Button from '@mui/material/Button';
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import { deleteGroup } from "api/password/group";
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";
import CustomDialogContent from "components/atoms/Dialog/CustomDialogContent";
import CustomDialogActions from "components/atoms/Dialog/CustomDialogActions";
import CustomCheckBox from "components/atoms/Input/CustomCheckBox";


const GroupDeleteDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = getToken();
  const open = useSelector((state: RootState) => state.passwordManage.openDeleteGroupDialog);
  const groups = useSelector((state: RootState) => state.passwordManage.groups);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

  const handleClose = () => { 
    dispatch(closeDeleteGroupDialog());
    dispatch(closeMinusButtonMenu());
  }

  const handleDelete = async() => {
    try {
      for (let index = 0; index < selectedGroups.length; index++) {
        await deleteGroup(selectedGroups[index], token);
      }
      dispatch( updateGroup(true) );
      setSelectedGroups([]);
    } catch (error) {
      const alert: Alert = {message: "削除に失敗しました。管理者にお問い合わせください。", severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  const handleGroupSelect = (event: React.ChangeEvent<HTMLInputElement>, groupId: number) => {
    if (event.target.checked) {
      setSelectedGroups([...selectedGroups, groupId]);
    } else {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    }
  };

  return(
    <div>
      <CustomDialog params={{
        open: open, 
        ariaLabelledBy: "group-delete-dialog", 
        close: () => handleClose()
      }}>
        <CustomDialogTitle
          title={t("component.dialog.title.deleteGroup")}
          close={() => handleClose()}
        />
        <CustomDialogContent>
          <form id="group-delete-form">
            {groups.map((group, index) => {
              return(
                <div className="flex" key={index}>
                  <CustomCheckBox 
                    label={group.group_name}
                    checked={selectedGroups.includes(group.id)} 
                    onChange={(event) => handleGroupSelect(event, group.id)} 
                  />
                </div>
              )
            })}
          </form>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button color="primary" onClick={handleDelete}>{t("component.button.delete")}</Button>
        </CustomDialogActions>
      </CustomDialog>
    </div>
  )
}

export default GroupDeleteDialog;
