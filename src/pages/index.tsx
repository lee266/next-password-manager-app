import { verifyJwt } from 'api/auth/jwt';
import { MainLayout } from 'components/layouts/MainLayout2';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from 'react';
import { getToken } from 'utils/auth';
import { useRouter } from "next/router";


export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const response = verifyJwt(token);
        console.log("response", response);
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
        <p>{t("general.nav.password")}</p>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

