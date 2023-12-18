import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomLink from 'components/atoms/CustomLink';
import PasswordResetForm from 'components/molecules/Form/PasswordResetForm';

const ResetPassword = () => {
  const { t } = useTranslation();
  return (
    <div className="reset-password">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('general.auth.resetPassword')}
        </Typography>
        <PasswordResetForm />
        <CustomLink href="/login2">back</CustomLink>
      </Box>
    </div>
  );
};

export default ResetPassword;
