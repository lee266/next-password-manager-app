import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "redux/rootReducer";
import { closeDeleteTagDialog, closeMinusButtonMenu, updateTag } from "redux/passwordManage/reducer";
import { getToken } from 'utils/auth';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { deleteTag } from "api/password/tag";
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";


const TagDeleteDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = getToken();
  const open = useSelector((state: RootState) => state.passwordManage.openDeleteTagDialog);
  const tags = useSelector((state: RootState) => state.passwordManage.tags);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleClose = () => { 
    dispatch(closeDeleteTagDialog());
    dispatch(closeMinusButtonMenu());
    setSelectedTags([])
  }

  const handleDelete = async() => {
    try {
      for (let index = 0; index < selectedTags.length; index++) {
        await deleteTag(selectedTags[index], token);
      }
      dispatch( updateTag(true) );
    } catch (error) {
      const alert: Alert = {message: "削除に失敗しました。管理者にお問い合わせください。", severity: 'error',}
      dispatch(addAlert(alert));
    }
  }

  const handleTagSelect = (event: React.ChangeEvent<HTMLInputElement>, tagId: number) => {
    if (event.target.checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    }
  };

  return(
    <div>
      <CustomDialog params={{
        open: open, 
        ariaLabelledBy: "tag-delete-dialog", 
        close: () => handleClose()
      }}>
        <CustomDialogTitle
          title={t("component.dialog.title.deleteTag")}
          close={() => handleClose()}
          />
        <DialogContent dividers={true}>
          <form id='tag-delete-form'>
            {tags.map((tag, index) => {
              return(
                <div className="flex" key={index}>
                  <FormControlLabel
                    label={tag.tag_name}
                    control={
                      <Checkbox 
                        checked={selectedTags.includes(tag.id)} 
                        onChange={(event) => handleTagSelect(event, tag.id)} 
                      />
                    }
                  />
                </div>
              )
            })}
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDelete}>{t("component.button.delete")}</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  )
}

export default TagDeleteDialog;
