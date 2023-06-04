import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { OpenAddDialog } from 'redux/passwordManage/reducer';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getToken } from 'utils/auth';
import { createPassword } from 'api/password/crud';
import { useRouter } from 'next/router';
import { getUser } from 'api/users/crud';

type PasswordAddDialogData = {
  title: string
  password: string
  email: string
  notes: string
  tags: string
  website: string
  user: number
}

const PasswordAddDialog = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = getToken();
  const open = useSelector((state: RootState) => state.passwordManage.openAddDialog);
  // Define yup Error Messages
  const requiredError = t("general.yup.required");
  const urlError = t("general.yup.url")
  const requiredEmail = t("general.yup.email");
  const schema = yup.object().shape({
    title: yup.string().required(requiredError),
    password: yup.string()
      .trim()
      .required(requiredError),
    email: yup.string().email(requiredEmail),
    notes: yup.string(),
    tags: yup.string(),
    website: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<PasswordAddDialogData>({
    resolver: yupResolver(schema)
  });
  
  const handleAdd: SubmitHandler<PasswordAddDialogData> = async (data) => {
    console.log("action handleAdd", data);
    if (token) {
      try { 
        const user = await getUser(token);
        console.log(user);
        data["user"] = user.id;
        console.log(data);
        await createPassword(data, token);
      } catch (error) {
        console.log(error);
      }
    }else {
      await router.push("/login2")
    }
    dispatch(OpenAddDialog());
  }

  const handleClose = () => {
    dispatch(OpenAddDialog());
    console.log("ok");
  }

  return(
    <div>
      <Dialog
        // fullScreen={}
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="password-manage-add-dialog"
      >
        <DialogTitle id="password-manage-add-dialog">
          {"Add password"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{position: 'absolute',right: 8,top: 8,}}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form autoComplete="new-password">
          <DialogContent>
              <TextField
                id="title"
                label={t("component.form.title")}
                margin="normal"
                required
                fullWidth
                autoComplete='new-password'
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                id="password"
                label={t("component.form.password")}
                margin="normal"
                required
                fullWidth
                type="password"
                autoComplete="off"
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
              <Select
                id="tags"
                label={t("component.form.tags")}
                fullWidth
                {...register('tags')}
                error={!!errors.tags}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
              <Select
                id="groups"
                label={""}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
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
            <Button onClick={handleSubmit(handleAdd)} form="password-add">
              {t("component.button.add")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default PasswordAddDialog;
