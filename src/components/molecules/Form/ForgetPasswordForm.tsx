import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
// MUI 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import { resetPassword } from "api/auth/auth";
import Typography from "@mui/material/Typography";

type ForgetPasswordFormData = {
  email: string
}

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  // Define yup Error Messages
  const requiredError = t("general.yup.required");
  const requiredEmail = t("general.yup.email");

  const schema = yup.object().shape({
    email: yup.string()
      .trim()
      .email(requiredEmail)
      .required(requiredError),
  })

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<ForgetPasswordFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data:ForgetPasswordFormData) => {
    setIsSubmitting(true);
    try {
      const response = await resetPassword(data)
      console.log(response);
      setIsSubmitting(false);
      setSuccessSubmit(true)
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
    console.log("submit");
  }

  return(
    <div className="forget-password-form">
      {successSubmit ? 
        <Typography>パスワード変更メールが送信されました。内容を確認して掲載されているURLからパスワード変更を変更してください。</Typography>:
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="email"
            label={t("general.auth.email")}
            margin="normal"
            fullWidth
            autoComplete="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 
              <CircularProgress size={24} color="primary" />: t("general.auth.signIn")
            }
          </Button>
        </form>
      }
    </div>
  )
}

export default ForgetPasswordForm;
