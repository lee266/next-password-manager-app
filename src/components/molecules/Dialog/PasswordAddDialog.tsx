import { useTranslation } from "next-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { closeAddDialog, addPassword } from 'redux/passwordManage/reducer';
import { getUser } from 'api/users/crud';
import { getToken } from 'utils/auth';
import { Password, PasswordSchema } from 'types/models/Password';
import { Alert } from "redux/Feedback/types";
import { addAlert } from "redux/Feedback/reducer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import AddButton from 'components/atoms/Button/AddButton';
import { createPassword } from "api/password/crud";
import { useEffect, useState } from "react";
import { getGroups } from "api/password/group";
import { getTags } from "api/password/tag";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';


type SelectBoxGroup = {
  id: number;
  group_name: string;
}

type SelectBoxTag = {
  id: number;
  tag_name: string;
}

const PasswordAddDialog = () => {
  const [selectBoxGroups, setSelectBoxGroups] = useState<SelectBoxGroup[]>([]);
  const [selectBoxTags, setSelectBoxTags] = useState<SelectBoxTag[]>([]);
  const { t } = useTranslation();
  const token = getToken();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.passwordManage.openAddDialog);
  // react form settings
  const form = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { 
      user: 9999999999, 
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
    reset(); 
  }

  const onSubmit: SubmitHandler<Password> = async(data) => {
    console.log("onSubmit");
    try { 
      const user = await getUser(token);
      data["user"] = user.id;
      console.log("data", data);
      
      await createPassword(data, token);
      dispatch(addPassword(data.title));
      reset();
      handleClose();
    } catch (error:any) {
      const alert: Alert = {
        message: error.message,
        severity: "error",
      }
      dispatch(addAlert(alert));
    }
  }

  const getSelectBoxData =async () => {
    const user = await getUser(token);
    const selectBoxGroups = await getGroups({ user_id: user.id }, token);
    const selectBoxTags = await getTags({ user_id: user.id }, token);
    setSelectBoxGroups(selectBoxGroups.data);
    setSelectBoxTags(selectBoxTags.data);
  }

  useEffect(() => {
    console.log("move init passwordAddDialog");
    getSelectBoxData();
  }, [token]);

  return(
    <div className="password-add-dialog">
      <Dialog open={open} aria-labelledby="password-add-dialog" onClose={() => handleClose()}>
        <DialogTitle id="password-manage-add-dialog">
          {t("Add Password")}
          <IconButton aria-label="close" sx={{position: 'absolute',right: 8,top: 8,}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form id="password-form" onSubmit={handleSubmit(onSubmit)} autoComplete='new-password'>
          <DialogContent dividers>
            <TextField
              label={t("component.form.title")  + "*"}
              margin="normal"
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              id="password"
              label={t("component.form.password") + "*"}
              margin="normal"
              fullWidth
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              id="email"
              label={t("component.form.email")}
              margin="normal"
              fullWidth
              type="email"
              autoComplete="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              id="website"
              label={t("component.form.website")}
              margin="normal"
              fullWidth
              autoComplete="website url"
              {...register('website')}
              error={!!errors.website}
              helperText={errors.website?.message}
            />
            <FormControl className="mt-2" fullWidth>
              <InputLabel id="tag">{t("component.form.tag")}</InputLabel>
              <Select
                id="tag"
                label="Age"
                fullWidth
                {...register('tag')}
                error={!!errors.tag}
                defaultValue=""
              >
                {selectBoxTags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>{tag.tag_name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.tag?.message}</FormHelperText>
            </FormControl>
            <FormControl className="mt-4" fullWidth>
              <InputLabel id="groups">{t("component.form.group")}</InputLabel>
              <Select
                id="groups"
                label={t("component.form.group")}
                fullWidth
                {...register('group')}
                error={!!errors.group}
                defaultValue=""
              >
                {selectBoxGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>{group.group_name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.group?.message}</FormHelperText>
            </FormControl>
            <TextField
              id="notes"
              label={t("component.form.note")}
              multiline
              margin="normal"
              fullWidth
              maxRows={4}
              autoComplete="notes"
              {...register('notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          </DialogContent>
          <DialogActions>
            <AddButton name={t('add')} form='password-form' type="submit" />
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default PasswordAddDialog;
