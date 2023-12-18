import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch } from 'react-redux';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import { getToken } from 'utils/auth';
import { verifyJwt } from 'api/auth/jwt';
import { MainLayout } from 'components/layouts/MainLayout2';
import InquiryForm from 'components/molecules/Form/InquiryForm';
import Container from '@mui/material/Container';
import Alerts2 from 'components/molecules/Feedback/Alerts2';

const InquiryPage = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
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

    verifyAndRedirect().then((isValid) => {
      if (!isValid) {
        const alert: Alert = { message: t('general.error.token'), severity: 'error' };
        dispatch(addAlert(alert));
        router.push('/login2');
      }
    });
  }, [router]);

  return (
    <div>
      <MainLayout>
        <Alerts2 />
        <Container maxWidth="sm">
          <InquiryForm />
        </Container>
      </MainLayout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    locale = 'ja';
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default InquiryPage;
