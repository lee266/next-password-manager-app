import { GetStaticProps, NextPage } from "next";
// translation
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from '../styles/Home.module.scss';
// MUI 
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Alerts2 from "components/molecules/Feedback/Alerts2";
import Login from "components/organisms/Auth/Login/Login";

const loginPage: NextPage = () => {
  return (
    <div className="login-section">
      <Box className={styles.main}>
        <Alerts2/>
        <Container component="main" maxWidth="xs">
          <Login/>
        </Container>
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  if (!locale) { locale = 'ja' }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

export default loginPage;
