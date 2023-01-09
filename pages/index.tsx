import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Inter } from '@next/font/google'
import MainLayout from '../components/layouts/MainLayout';
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <MainLayout title='index'>
        <p>{t("general.nav.password")}</p>
      </MainLayout>
    </>
  );
}

// export const GetStaticProps: GetStaticProps<{Locales: IndexProps}> = async(
//   context
// ) => {

// }

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

