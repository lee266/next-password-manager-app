import axios, { AxiosResponse } from 'axios';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/`;
const API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/users/me/`;

export const getUser = async (token: string) => {
  // console.log('Active getUser() src/api/users/crud.ts');
  const headers = { Authorization: `JWT ${token}` };
  try {
    const response: AxiosResponse = await axios.get(API_URL, { headers });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const saveUser = async (data: object) => {
  // console.log('Active saveUser() src/api/users/crud.ts');
  // console.log("request:data", data);
  const POST_URL = BASEURL + 'users/';
  return await axios.post(POST_URL, data);
};
