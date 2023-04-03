import axios, { AxiosResponse } from "axios";

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/`
const API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/users/me/`;

type getUserFunction = (token:string) => Promise<undefined | AxiosResponse>

export const getUser = async(token:string) => {
  console.log('Active getUser() src/api/users/crud.ts');
  const headers = {
    "Authorization": `JWT ${token}`,
  };
  try {
    console.log('header', headers);
    const response:AxiosResponse = await axios.get(API_URL, {headers});
    console.log('getUser return data',response.data);
    return response.data
  }catch (error) {
    console.log("Failure getUser function");
    return null
  }
}

export const saveUser = async (data:object) => {
  console.log('Active saveUser() src/api/users/crud.ts');
  console.log("request:data", data);
  const POST_URL = BASEURL + 'users/';
  return await axios.post(POST_URL, data);
}
