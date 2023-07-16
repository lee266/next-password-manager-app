import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { verifyJwt } from 'api/auth/jwt';
import { getToken } from 'utils/auth';
import { MainLayout } from 'components/layouts/MainLayout2';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
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
  const [, setToken] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        verifyJwt(token);
        setToken(token)
      } catch (error) { router.push("/login2"); }
    } else { router.push("/login2");}
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
