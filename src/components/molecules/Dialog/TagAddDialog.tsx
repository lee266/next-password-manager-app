import { useTranslation } from "next-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closePlusButtonMenu, closeTagDialog, updateTag } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { createTag } from "api/password/tag";
import { getToken } from 'utils/auth';
import { PasswordTag, PasswordTagSchema } from 'types/models/Password';
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import AddButton from 'components/atoms/Button/AddButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomDialog from "components/atoms/CustomDialog";
import CustomDialogTitle from "components/atoms/CustomDialogTitle";


const TagAddDialog = () => {
  const { t } = useTranslation();
  const token = getToken();
  const tags = useSelector((state: RootState) => state.passwordManage.tags);
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openTagDialog);
  // react form settings
  const form = useForm<PasswordTag>({
    resolver: zodResolver(PasswordTagSchema),
    defaultValues: { user: -1, tag_name: ""}
  })
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const handleClose = () => { 
    dispatch(closeTagDialog());
    dispatch(closePlusButtonMenu());
    reset();
  }

  const onSubmit: SubmitHandler<PasswordTag> = async(data) => {
    try { 
      const user = await getUser(token);
      data["user"] = user.id;
      await createTag(data, token);
      dispatch(updateTag(true));
      reset();
    } catch (error) {
      const alert: Alert = {
        message: "エラーが発生しました。タグに既に存在している場合は追加できません。",
        severity: "error",
      }
      dispatch(addAlert(alert));
      reset();
    }
  }

  return(
    <div className="tag-add-dialog">
      <CustomDialog params={{
        open: open, 
        ariaLabelledBy: "group-delete-dialog", 
        close: () => handleClose()
      }}>
        <CustomDialogTitle
          title={t("component.dialog.title.addTag")}
          close={() => handleClose()}
          />
        <DialogContent dividers>
          <form id="tag-form" onSubmit={handleSubmit(onSubmit)} autoComplete='new-tag'>
            <TextField 
              label="Tag name*"
              fullWidth
              {...register('tag_name')}
              error={!!errors.tag_name}
              helperText={errors.tag_name?.message}
              variant="outlined"
              margin="normal"
            />
            <Typography variant="subtitle1" className="mt-3">現在存在するタグ</Typography>
            <Box bgcolor="#f0f0f0" p={1} my={2} style={{ maxHeight: '8em', overflowY: 'auto', lineHeight: '1em' }}>
              {tags.map((tag, index) => {
                return(
                  <Typography variant="body2" key={index}>{tag.tag_name}</Typography>
                )
              })}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <AddButton name={t('component.button.add')} form='tag-form' type="submit" />
        </DialogActions>
      </CustomDialog>
    </div>
  )
}

export default TagAddDialog;
