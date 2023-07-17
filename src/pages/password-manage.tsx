import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from 'react-redux';
import { Alert } from 'redux/Feedback/types';
import { addAlert } from 'redux/Feedback/reducer';
import { verifyJwt } from 'api/auth/jwt';
import { getToken } from 'utils/auth';
import { MainLayout } from 'components/layouts/MainLayout2';
import PasswordAddDialog from 'components/molecules/Dialog/PasswordAddDialog';
import PasswordDetail from 'components/molecules/Dialog/PasswordDetail';
import PasswordFilters from 'components/molecules/Filter/Table/PasswordFilters';
import PasswordCard from 'components/molecules/Card/PasswordCards';
import GroupAddDialog from 'components/molecules/Dialog/GroupAddDialog';
import Alerts2 from "components/molecules/Feedback/Alerts2";
import TagAddDialog from 'components/molecules/Dialog/TagAddDialog';
import PasswordSearchDialog from 'components/molecules/Dialog/PasswordSearchDialog';
import TagDeleteDialog from 'components/molecules/Dialog/TagDeleteDialog';
import GroupDeleteDialog from 'components/molecules/Dialog/GroupDeleteDialog';
import PasswordDeleteDialog from 'components/molecules/Dialog/PasswordDeleteDialog';

const PasswordManage = () => {
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
  
    verifyAndRedirect().then(isValid => {
      if (!isValid) {
        const alert: Alert = {message: "トークンの確認に失敗しました。再度ログインしてください。", severity: 'error',}
        dispatch(addAlert(alert));
        router.push("/login2");
      }
    });
  }, [router]);
  
  return(
    <div className='password-manage-section'>
      <MainLayout>
        <PasswordFilters />
        <PasswordCard />
        <Alerts2 />
        <PasswordAddDialog />
        <PasswordDeleteDialog />
        <PasswordSearchDialog />
        <PasswordDetail />
        <GroupAddDialog />
        <GroupDeleteDialog />
        <TagAddDialog />
        <TagDeleteDialog />
      </MainLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  if (!locale) { locale = 'ja' }
  return {
    props: { ...(await serverSideTranslations(locale, ["common"])), }
  }
}

export default PasswordManage;
