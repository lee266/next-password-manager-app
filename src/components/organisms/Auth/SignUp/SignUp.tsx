import { useTranslation } from 'next-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomLink from 'components/atoms/CustomLink';
import SignUpForm from 'components/molecules/Form/SignUpForm';
import Copyright from 'components/molecules/Copyright';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <div className="sign_up">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('general.auth.signUp')}
        </Typography>
        <SignUpForm />
        <CustomLink href="/login2">{t('component.link.alreadySignUp')}</CustomLink>
      </Box>
      <Copyright sx={{ mt: 3 }} />
    </div>
  );
};

export default SignUp;
