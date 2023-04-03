import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { verifyJwt } from 'api/auth/jwt';
import { getToken } from 'utils/auth';
import { MainLayout } from 'components/layouts/MainLayout2';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PasswordTable from 'components/molecules/Table/PasswordTable';
import { GetServerSideProps } from 'next';
import PasswordFilters from 'components/molecules/Filter/Table/PasswordFilters';
import PasswordAddDialog from 'components/molecules/Filter/Table/PasswordAddDialog';
import { getUser } from 'api/users/crud';

interface PasswordManageProps {
  children: React.ReactNode;
  open: boolean;
  id: string;
}


const PasswordManage = () => {
  const router = useRouter();
  // const [posts, setPosts] = useState([])
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        verifyJwt(token);
        setToken(token)
        console.log("Your true");
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
        <PasswordAddDialog/>
        <PasswordFilters/>
        <PasswordTable
          token={token}
        />
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
