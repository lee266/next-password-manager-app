import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAlert } from "redux/Feedback/reducer";
import { Alert } from "redux/Feedback/types";
import { saveUser } from "api/users/crud";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema, UserFrom } from "types/forms/UserForm";
import { AxiosError } from "axios";
import CustomTextField from "components/atoms/Input/CustomTextField";
import CustomButton from "components/atoms/Button/CustomButton";


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
        <CustomTextField 
          id="username"
          label={t("general.auth.username")}
          error={errors.username}
          register={register}
        />
        <CustomTextField 
          id="email"
          label={t("general.auth.email")}
          error={errors.email}
          register={register}
        />
        <CustomTextField 
          id="password"
          label={t("general.auth.password")}
          type="password"
          error={errors.password}
          register={register}
        />
        <CustomTextField 
          id="re_password"
          label={t("general.auth.confirmPassword")}
          type="password"
          error={errors.re_password}
          register={register}
        />
        <CustomButton 
          type="submit"
          fullWidth={true}
          onClick={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          buttonText="signUp"
        />
      </form>
    </div>
  )
}

export default SignUpForm;
