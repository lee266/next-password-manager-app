import * as React from 'react';
import { useRouter } from "next/router";
import Cookie from 'universal-cookie';

type checkLoginProps = {
  children: React.ReactNode;
};

const cookie = new Cookie();

const login = async () => {
  const router = useRouter();
  try {
    const accessToken = cookie.get("access_token");
    if (accessToken) {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/verify/`,
        {
          method: "POST",
          body: JSON.stringify({
            token: accessToken
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        if (res.status === 401) {
          cookie.remove("id");
          cookie.remove("access_token");
          router.push("/");
        }else if (res.ok) {
          return res.json();
        }
      });
    } else {
      router.push("/");
    }
  } catch (error) {
    cookie.remove("id");
    cookie.remove("access_token");
    router.push("/");
  }
}


export default function CheckLogin(props: checkLoginProps) {
  return (
    <>
     {props.children}
    </>
  )
}

export async function getStaticProps() {
  login()
}