import * as React from 'react';

import MainLayout from '../components/layouts/MainLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Home.module.scss';
import CssBaseline from '@mui/material/CssBaseline';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const theme = createTheme();

export default function TemplatePage() {
  const { t } = useTranslation();

  return(
    <MainLayout title='template-page'>
      <h1>password manage</h1>
    </MainLayout>
    // <Box className={styles.main}>
    //   <ThemeProvider theme={theme}>
    //     <Container component="main" maxWidth="xs">
    //       <CssBaseline />
    //     </Container>
    //   </ThemeProvider>
    // </Box>
  )

}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}
