import { useRouter } from "next/router";
import { useState } from "react";
// translation
import { useTranslation } from "next-i18next";
// validation rule
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import { fetchUserDataRequest } from "redux/users/reducer";
// MUI
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import { createJwt } from "api/auth/jwt";
import { saveToken } from "utils/auth";

type LoginFromData = {
  email: string
  password: string
}

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Define yup Error Messages
  const requiredError = t("general.yup.required");
  const requiredEmail = t("general.yup.email");
  // validation rule 
  const schema = yup.object().shape({
    email: yup.string()
      .trim()
      .email(requiredEmail)
      .required(requiredError),
    password: yup.string()
      .required(requiredError)
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFromData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<LoginFromData> = async(data) => {
    try {
      setIsSubmitting(true);
      const token = await createJwt(data);
      const accessKey:string = token.data.access;
      // Save token in cookie 
      saveToken(accessKey);
      dispatch(fetchUserDataRequest());
      setAlertMessage("create jwt");
      const alert: Alert = {
        message: alertMessage,
        severity: "success",
      }
      dispatch(addAlert(alert));
      await router.push("/");
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
    }finally {
      setIsSubmitting(false);
    }
  }

  return(
    <div className="login-form">
      <form>
        <TextField
          id="email"
          label={t("general.auth.email")}
          margin="normal"
          required
          fullWidth
          autoComplete="email"
          autoFocus
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="password"
          label={t("general.auth.password")}
          margin="normal"
          required
          fullWidth
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
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
            <CircularProgress size={24} color="primary" /> : t("component.button.login")
          }
        </Button>
      </form>
    </div>
  )
}

export default LoginForm;
