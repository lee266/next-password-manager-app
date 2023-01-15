import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Inter } from '@next/font/google'
import MainLayout from '../components/layouts/MainLayout';
import CheckLogin from '../components/molecules/Auth/checkLogin';
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <CheckLogin>
        <MainLayout title='index'>
          <p>{t("general.nav.password")}</p>
        </MainLayout>
      </CheckLogin>
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

