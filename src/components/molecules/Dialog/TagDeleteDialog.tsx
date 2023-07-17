import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "redux/rootReducer";
import { closeDeleteTagDialog, closeMinusButtonMenu, updateTag } from "redux/passwordManage/reducer";
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
import { deleteTag } from "api/password/tag";
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";


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
      <Dialog fullScreen open={open} aria-labelledby='tag-delete-dialog' scroll='paper'
        onClose={() => handleClose()}
      >
        <DialogTitle id='tag-delete-dialog'>
          {t("Tag delete")}
          <IconButton aria-label='close' sx={{position: 'absolute',right: 8,top: 8,}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
          <Button color="primary" onClick={handleDelete}>削除</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TagDeleteDialog;
