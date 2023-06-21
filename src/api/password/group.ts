import axios from "axios"
import { PasswordGroup } from 'types/models/Password';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/groups/`

export const createGroup =async (data:PasswordGroup , token:string) => {
  console.log("Active createGroup api/passwords/group.ts");
  const config = {
    headers: {
      Authorization: 'JWT ' + token
    }
  }

  return await axios.post(BASEURL, data, config);
}

