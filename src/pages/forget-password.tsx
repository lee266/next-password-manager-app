import { GetStaticProps, NextPage } from "next";
import styles from '../styles/Home.module.scss';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ForgetPassword from "components/organisms/Auth/ResetPassword/ForgetPassword";
import Alerts2 from "components/molecules/Feedback/Alerts2";

const forgetPasswordPage: NextPage = () => {
  return(
    <div className="forget-password min-h-screen dark:bg-back-rightDark">
      <Box className={styles.main}>
        <Alerts2/>
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
