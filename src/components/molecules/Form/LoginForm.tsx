import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import { fetchUserDataRequest } from "redux/users/reducer";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import { createJwt } from "api/auth/jwt";
import { saveToken } from "utils/auth";
import { UserLoginFormSchema, UserLoginFrom } from "types/forms/UserForm";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserLoginFrom>({
    resolver: zodResolver(UserLoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<UserLoginFrom> = async(data) => {
    try {
      setIsSubmitting(true);
      const token = await createJwt(data);
      const accessKey:string = token.data.access;
      // Save token in cookie 
      saveToken(accessKey);
      dispatch(fetchUserDataRequest());
      await router.push("/");
      const alert: Alert = { message: "ログインに成功しました。", severity: "success", }
      dispatch(addAlert(alert));
    } catch (error) {
      const errorMessage = "ログインに失敗しました。アカウントが存在しない可能があります。サインアップしてください。既にアカウントを持っている場合は、testerif0@gmail.comに連絡ください";
      const alert: Alert = { message: errorMessage, severity: "error", }
      dispatch(addAlert(alert))
    }finally {
      setIsSubmitting(false);
    }
  }

  return(
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          label={t("general.auth.email")  + '*'}
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
          label={t("general.auth.password")  + '*'}
          margin="normal"
          fullWidth
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password && t(`general.error.${errors.password?.message}`)}
        />
        <Button
          className="bg-primary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <CircularProgress size={24} color="primary" /> : t("component.button.login")
          }
        </Button>
      </form>
    </div>
  )
}

export default LoginForm;
