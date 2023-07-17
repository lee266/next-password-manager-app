import axios, { AxiosResponse } from "axios"
import { PasswordGroup } from 'types/models/Password';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/groups/`

// Get 
export const getGroups = async (data: { user_id: number }, token:string): Promise<AxiosResponse> => {
  console.log("Active getGroups api/passwords/group.ts");
  const config = { headers: { Authorization: 'JWT ' + token } };
  const url = BASEURL + 'get_data/';
  return await axios.post(url, data, config);
}
// Create 
export const createGroup =async (data:PasswordGroup , token:string) => {
  console.log("Active createGroup api/passwords/group.ts");
  const config = { headers: { Authorization: 'JWT ' + token } }
  return await axios.post(BASEURL, data, config);
}

// Delete 
export const deleteGroup = async (groupId:number , token:string) => {
  console.log("Active deleteGroup api/passwords/group.ts");
  const config = { headers: { Authorization: 'JWT ' + token } }
  const url = `${BASEURL}${groupId}/`
  return await axios.delete(url, config);
}

