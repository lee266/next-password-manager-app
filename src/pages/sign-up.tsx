import * as React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.scss';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Alerts2 from 'components/molecules/Feedback/Alerts2';
import SignUp from 'components/organisms/Auth/SignUp/SignUp';

const SignUpPage:NextPage = ({}) =>{
  return (
    <div className='sign-up-section'>
      <Alerts2/>
      <Box className={styles.main} sx={{ display: 'flex' }}>
        <Container component="main" maxWidth="xs">
          <SignUp/>
        </Container>
      </Box>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  if (!locale) { locale = 'ja' }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

export default SignUpPage;
