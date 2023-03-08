import axios, { AxiosResponse } from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/users/me/`;

type getUserFunction = (token:string) => Promise<undefined | AxiosResponse>

export const getUser:getUserFunction = async(token:string) => {
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
