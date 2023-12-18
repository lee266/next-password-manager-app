import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import styles from '../../../../../styles/Home.module.scss';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ResetPassword from 'components/organisms/Auth/ResetPassword/ResetPassword';
import Alerts2 from 'components/molecules/Feedback/Alerts2';

type PasswordResetConfirmParams = {
  uid: string;
  token: string;
};

const ResetPasswordPage = () => {
  return (
    <div className="password-reset-section min-h-screen dark:bg-back-rightDark">
      <Box className={styles.main}>
        <Alerts2 />
        <Container component="main" maxWidth="xs">
          <ResetPassword />
        </Container>
      </Box>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<PasswordResetConfirmParams> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    locale = 'ja';
  }
  const translations = await serverSideTranslations(locale, ['common']);

  return {
    props: {
      locale,
      ...translations,
    },
  };
};

export default ResetPasswordPage;
