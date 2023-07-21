import { MainLayout } from "components/layouts/MainLayout2";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Inquiry = () => {
  return(
    <>
      <MainLayout>
        <h2>お問い合わせ</h2>
        
      </MainLayout>
    </>
  )
}


export const getStaticProps: GetStaticProps =async ({locale}) => {
  if (!locale) { locale = 'ja' }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

export default Inquiry;
