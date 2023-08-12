import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { resetPassword } from "api/auth/auth";
import Typography from "@mui/material/Typography";
import { UserForgetForm, UserForgetFormSchema } from "types/forms/UserForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import { useDispatch } from "react-redux";
import CustomButton from "components/atoms/Button/CustomButton";
import CustomTextField from "components/atoms/Input/CustomTextField";


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
          <CustomTextField
            id="email"
            label={t("general.auth.email")}
            error={errors.email}
            register={register}
          />
          <CustomButton 
            type="submit"
            fullWidth={true}
            isSubmitting={isSubmitting}
            buttonText="login"
          />
        </form>
      }
    </div>
  )
}

export default ForgetPasswordForm;
