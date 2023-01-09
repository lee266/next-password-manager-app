import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Login() {
  const { t } = useTranslation();

  return(
    <>
      <p>handleDrawerClose</p>
    </>
  )
}


export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}