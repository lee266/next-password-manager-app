import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { resetPassword } from "api/auth/auth";
import Typography from "@mui/material/Typography";
import { UserForgetForm, UserForgetFormSchema } from "types/forms/UserForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import { useDispatch } from "react-redux";


const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);

  const form = useForm<UserForgetForm>({
    resolver: zodResolver(UserForgetFormSchema),
    defaultValues: {
      email: '',
    }
  })
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async(data:UserForgetForm) => {
    setIsSubmitting(true);
    try {
      await resetPassword(data)
      setIsSubmitting(false);
      setSuccessSubmit(true)
    } catch (error) {
      const errorMessage = "ログインに失敗しました。アカウントが存在しない可能があります";
      const alert: Alert = { message: errorMessage, severity: "error", }
      dispatch(addAlert(alert))
      setIsSubmitting(false);
    }
  }

  return(
    <div className="forget-password-form">
      {successSubmit ? 
        <Typography className="mt-1 mb-1">パスワード変更メールが送信されました。内容を確認して掲載されているURLからパスワード変更を変更してください。</Typography>:
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="email"
            label={t("general.auth.email") + '*'}
            margin="normal"
            fullWidth
            autoComplete="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email && t(`general.error.${errors.email?.message}`)}
          />
          <Button
            className="bg-blue-500" 
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 
              <CircularProgress size={24} color="primary" />: t("component.button.sent")
            }
          </Button>
        </form>
      }
    </div>
  )
}

export default ForgetPasswordForm;
