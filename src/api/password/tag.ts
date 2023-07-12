import axios, { AxiosResponse } from "axios";
import { PasswordTag } from 'types/models/Password';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/`;

export const getTags =async (data: { user_id: number }, token:string): Promise<AxiosResponse> => {
  console.log("Active getTags api/passwords/group.ts");
  const config = { headers: { Authorization: 'JWT ' + token} }
  const url = BASEURL + 'get_data/';
  return await axios.post(url, data, config);
}

export const createTag =async (data:PasswordTag , token:string) => {
  console.log("Active createTag api/passwords/group.ts");
  const config = { headers: { Authorization: 'JWT ' + token } }

  return await axios.post(BASEURL, data, config);
}

