import axios from "axios"
import { Password } from 'types/models/Password';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/passwords/`;

// Get
export const getPasswords = async (id:string) => {
  console.log("Active getPasswords api/passwords/crud.ts");
  const getUrl = BASEURL + id
  return await axios.get(getUrl);
}

export const getGroupedPasswords = async (id:string) => {
  console.log("Active getGroupedPasswords api/passwords/crud.ts");
  const url = BASEURL + 'get_data/'
  return await axios.post(url, id);
}

export const searchPasswords =async (userId: number, passwordFilters: object|null, token: string) => {
  console.log("Active searchPasswords api/passwords/crud.ts");
  console.log("request:user, token", userId,token);
  const searchUrl = BASEURL + 'search/';
  const config = { headers: { Authorization: 'JWT ' + token } };
  return await axios.post(searchUrl, { user_id: userId, passwordFilters }, config);
}

// Create
export const createPassword =async (data:Password, token:string) => {
  console.log("Active createPassword api/passwords/crud.ts");
  const config = { headers: { Authorization: 'JWT ' + token } };
  return await axios.post(BASEURL, data, config);
}

// Update
export const updatePassword =async (data:Password, token:string, changeGroup:boolean) => {
  console.log("Active updatePassword api/passwords/crud.ts");
  const url = `${BASEURL}${data.id}/`
  const config = { headers: { Authorization: 'JWT ' + token } };
  const requestBody = {
    ...data,
    changeGroup: changeGroup,
  };

  return await axios.put(url, requestBody, config);
}

export const updateIndex =async (data:any) => {
  console.log("Active createPassword api/passwords/crud.ts");
  // const config = { headers: { Authorization: 'JWT ' + token } };
  const url = BASEURL + 'update_indexes/'
  return await axios.patch(url, data);
}

// Delete
export const deletePassword =async (data: {id: number, group: number|null}, token: string) => {
  console.log("Active deletePassword api/passwords/crud.ts");
  const url = `${BASEURL}${data.id}/`
  const config = { headers: { Authorization: 'JWT ' + token } };
  return await axios.delete(url, config);
}
