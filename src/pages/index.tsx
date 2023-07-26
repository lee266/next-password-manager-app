import { verifyJwt } from 'api/auth/jwt';
import { MainLayout } from 'components/layouts/MainLayout2';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from 'react';
import { getToken } from 'utils/auth';
import { useRouter } from "next/router";
import { GetStaticProps } from 'next';
import Calculator from 'components/molecules/Calculator';
import { Alert } from 'redux/Feedback/types';
import { useDispatch } from 'react-redux';
import { addAlert } from 'redux/Feedback/reducer';


const HomePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAndRedirect = async () => {
      const token = getToken();
      if (!token) return false;
      
      try {
        await verifyJwt(token);
        return true;
      } catch (error) {
        return false;
      }
    };
  
    verifyAndRedirect().then(isValid => {
      if (!isValid) {
        const alert: Alert = {message: t('general.error.token'), severity: 'error',}
        dispatch(addAlert(alert));
        router.push("/login2");
      }
    });
  }, [router]);

  return (
    <>
      <MainLayout>
        <div className='flex flex-col items-center min-h-screen'>
          <h1 className='text-6xl text-blue-700'>Hello world</h1>
          <Calculator/>
        </div>
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

export default HomePage;
