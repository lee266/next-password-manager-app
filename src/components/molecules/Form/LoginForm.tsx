import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAlert } from 'redux/Feedback/reducer';
import { Alert } from 'redux/Feedback/types';
import { fetchUserDataRequest } from 'redux/users/reducer';
import { createJwt } from 'api/auth/jwt';
import { saveToken } from 'utils/auth';
import { UserLoginFormSchema, UserLoginFrom } from 'types/forms/UserForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import CustomTextField from 'components/atoms/Input/CustomTextField';
import CustomButton from 'components/atoms/Button/CustomButton';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserLoginFrom>({
    resolver: zodResolver(UserLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<UserLoginFrom> = async (data) => {
    try {
      setIsSubmitting(true);
      const token = await createJwt(data);
      const accessKey: string = token.data.access;
      // Save token in cookie
      saveToken(accessKey);
      dispatch(fetchUserDataRequest());
      await router.push('/password-manage');
      const alert: Alert = { message: 'ログインに成功しました。', severity: 'success' };
      dispatch(addAlert(alert));
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage =
        'ログインに失敗しました。アカウントが存在しない可能があります。サインアップしてください。既にアカウントを持っている場合は、testerif0@gmail.comに連絡ください';
      if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
        errorMessage = 'サーバが起動中です。少々お待ちください。30s~1min';
      }
      const alert: Alert = { message: errorMessage, severity: 'error' };
      dispatch(addAlert(alert));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField id="email" label={t('general.auth.email')} error={errors.email} register={register} />
        <CustomTextField
          id="password"
          label={t('general.auth.password')}
          error={errors.password}
          register={register}
          type="password"
        />
        <CustomButton type="submit" fullWidth={true} isSubmitting={isSubmitting} buttonText="login" />
      </form>
    </div>
  );
};

export default LoginForm;
