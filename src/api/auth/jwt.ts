import axios from 'axios';

type PostType = {
  email: string;
  password: string;
};

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/`;
const URL_CRETE = BASEURL + 'create';
const URL_VERIFY = BASEURL + 'verify/';

export const createJwt = async (data: PostType) => {
  return await axios.post(URL_CRETE, data);
};

export const verifyJwt = async (jwt: string) => {
  // console.log("came jwt", jwt);
  // console.log(URL_VERIFY);
  const data = { token: jwt };
  return await axios.post(URL_VERIFY, data);
};
