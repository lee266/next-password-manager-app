import { GetStaticProps, NextPage } from "next";
import styles from '../styles/Home.module.scss';
// translation
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// MUI 
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ForgetPassword from "components/organisms/Auth/ResetPassword/ForgetPassword";

const forgetPasswordPage: NextPage = () => {
  return(
    <div className="forget-password">
      <Box className={styles.main}>
        <Container component="main" maxWidth="xs">
          <ForgetPassword/>
        </Container>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async({
  locale,
}) => {
  if (!locale) { locale = 'ja' }
  const translations = await serverSideTranslations(locale, ["common"])

  return {
    props: {
      locale,
      ...translations
    },
  }
}

export default forgetPasswordPage;
