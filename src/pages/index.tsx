import { verifyJwt } from 'api/auth/jwt';
import { MainLayout } from 'components/layouts/MainLayout2';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from 'react';
import { getToken } from 'utils/auth';
import { useRouter } from "next/router";
import { GetStaticProps } from 'next';

import Calculator from 'components/molecules/Calculator';


const Home = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const response = verifyJwt(token);
      } catch (error) {
        router.push("/login2");
      }
    } else {
      router.push("/login2");
    }
  }, [router]);

  return (
    <>
      <MainLayout>
        <h1 className='text-6xl text-blue-700'>Hello world</h1>
        <Calculator/>
      </MainLayout>
    </>
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

export default Home;
