import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
// MUI 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { saveUser } from "api/users/crud";
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import { useState } from "react";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Define yup Error Messages
  const requiredError = t("general.yup.required");
  const requiredEmail = t("general.yup.email");
  const passwordMatchError = t("general.yup.passwordsMatch");
  const minError = t("general.yup.minChars");

  const schema = yup.object().shape({
    username: yup.string()
      .trim()
      .required(requiredError),
    email: yup.string()
      .trim()
      .email(requiredEmail)
      .required(requiredError),
    password: yup.string()
      .required(requiredError)
      .min(8, minError),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], passwordMatchError)
      .required(requiredError),
  });

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: SignUpFormData) => {
    setIsSubmitting(true);
    try {
      await saveUser(data);
      setAlertMessage("sign up success")
      const alert: Alert = {
        message: alertMessage,
        severity: "success",
      }
      dispatch(addAlert(alert))
      await router.push('/login2');
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="username"
          label={t("general.auth.username")}
          margin="normal"
          fullWidth
          autoComplete="username"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
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
          helperText={errors.email?.message}
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
          helperText={errors.password?.message}
        />
        <TextField
          id="confirmPassword"
          label={t("general.auth.confirmPassword")}
          margin="normal"
          fullWidth
          type="password"
          autoComplete="confirmPassword"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <CircularProgress size={24} color="primary" /> : t("general.auth.signIn")
          }
        </Button>
      </form>
    </div>
    // <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12}>
    //       <TextField/>
    //     </Grid>
    //   </Grid>
    // </Box>
  )
}

export default SignUpForm;
