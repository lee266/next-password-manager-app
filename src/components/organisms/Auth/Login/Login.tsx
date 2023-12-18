import { useTranslation } from 'next-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomLink from 'components/atoms/CustomLink';
import LoginForm from 'components/molecules/Form/LoginForm';
import Copyright from 'components/molecules/Copyright';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div>
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
          {t('general.auth.login')}
        </Typography>
        <LoginForm />
        <Grid container>
          <Grid item xs>
            <CustomLink href="/forget-password">{t('general.auth.forgotPassword') + '?'}</CustomLink>
          </Grid>
          <Grid item>
            <CustomLink href="/sign-up">
              {t('general.auth.noAccount') + '?' + t('general.auth.pleaseSignUp')}
            </CustomLink>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 3 }} />
      </Box>
    </div>
  );
};

export default Login;
