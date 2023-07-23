import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import { saveUser } from "api/users/crud";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema, UserFrom } from "types/forms/UserForm";
import { AxiosError } from "axios";


const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserFrom>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      re_password: ''
    }
  })

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<UserFrom> = async(data) => {
    try {
      setIsSubmitting(true);
      await saveUser(data);
      setAlertMessage("sign up success")
      const alert: Alert = {
        message: alertMessage,
        severity: "success",
      }
      dispatch(addAlert(alert))
      await router.push('/login2');
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = "サインアップに失敗しました。既にアカウントが存在する可能性があります。";
      if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
        errorMessage = "サーバが起動中です。少々お待ちください。30s~1min";
      }
      const alert: Alert = {
        message: errorMessage, 
        severity: 'error',
      }
      dispatch(addAlert(alert));
    }finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="sing-up-form">
      <form>
        <TextField
          id="username"
          label={t("general.auth.username")}
          margin="normal"
          fullWidth
          autoComplete="username"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username && t(`general.error.${errors.username?.message}`)}
        />
        <TextField
          id="email"
          label={t("general.auth.email")}
          margin="normal"
          fullWidth
          autoComplete="email"
          autoFocus
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email && t(`general.error.${errors.email?.message}`)}
        />
        <TextField
          id="password"
          label={t("general.auth.password")}
          margin="normal"
          fullWidth
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password && t(`general.error.${errors.password?.message}`)}
        />
        <TextField
          id="re_password"
          label={t("general.auth.confirmPassword")}
          margin="normal"
          fullWidth
          type="password"
          autoComplete="confirmPassword"
          {...register('re_password')}
          error={!!errors.re_password}
          helperText={errors.re_password && t(`general.error.${errors.re_password?.message}`)}
        />
        <Button
          className="bg-blue-500"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <CircularProgress size={24} color="primary" /> : t("general.auth.signUp")
          }
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm;
