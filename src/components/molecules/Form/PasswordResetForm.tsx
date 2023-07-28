import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
// MUI 
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import { resetPasswordConfirm } from "api/auth/auth";
import { UserResetForm, UserResetFormSchema } from "types/forms/UserForm";
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordResetForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const routerQuery = router.query;
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserResetForm>({
    resolver: zodResolver(UserResetFormSchema),
    defaultValues: {
      new_password: '',
      re_new_password: '',
    }
  })
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<UserResetForm> = async(password) => {
    try {
      setIsSubmitting(true);
      const data = {...password, ...routerQuery}
      await resetPasswordConfirm(data);
      setAlertMessage("Success change password");
      const alert: Alert = {
        message: alertMessage,
        severity: "success",
      }
      dispatch(addAlert(alert))
      await router.push("/login2")
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(error.message)
      }else{
        setAlertMessage("error")
      }
      const alert: Alert = {
        message: alertMessage,
        severity: "error",
      }
      dispatch(addAlert(alert))
    }finally{
      setIsSubmitting(false);
    }
  }

  return(
    <div className="password-reset-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="new_password"
          label={t("general.auth.password") + '*'}
          margin="normal"
          fullWidth
          type="password"
          autoComplete="current-password"
          {...register('new_password')}
          error={!!errors.new_password}
          helperText={errors.new_password && t(`general.error.${errors.new_password?.message}`)}
        />
        <TextField
          id="re_password"
          label={t("general.auth.confirmPassword") + '*'}
          margin="normal"
          fullWidth
          type="password"
          autoComplete="confirmPassword"
          {...register('re_new_password')}
          error={!!errors.re_new_password}
          helperText={errors.re_new_password && t(`general.error.${errors.re_new_password?.message}`)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <CircularProgress size={24} color="primary" /> : t("component.button.resetPassword")
          }
        </Button>
      </form>
    </div>
  )
}

export default PasswordResetForm;
