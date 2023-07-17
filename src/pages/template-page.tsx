import * as React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export default function TemplatePage() {

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
