import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { verifyJwt } from 'api/auth/jwt';
import { getToken } from 'utils/auth';
import { MainLayout } from 'components/layouts/MainLayout2';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
import PasswordTable from 'components/molecules/Table/PasswordTable';
import PasswordFilters from 'components/molecules/Filter/Table/PasswordFilters';
import PasswordAddDialog from 'components/molecules/Filter/Table/PasswordAddDialog';
import PasswordCard from 'components/molecules/Card/PasswordCards';
import PasswordGroupAddDialog from 'components/molecules/Dialog/PasswordGroupAddDialog';
import Alerts2 from "components/molecules/Feedback/Alerts2";

const PasswordManage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        verifyJwt(token);
        setToken(token)
      } catch (error) {
        router.push("/login2");
      }
    } else {
      router.push("/login2");
    }
  }, [router]);
  
  return(
    <div className='password-manage-section'>
      <MainLayout>
        <Alerts2/>
        <PasswordAddDialog/>
        <PasswordGroupAddDialog/>
        <PasswordFilters/>
        {/* <PasswordTable
          token={token}
        /> */}
        <PasswordCard/>
      </MainLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  if (!locale) { locale = 'ja' }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

export default PasswordManage;
