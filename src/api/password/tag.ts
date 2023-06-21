import axios from "axios"
import { PasswordTag } from 'types/models/Password';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tags/`

export const createTag =async (data:PasswordTag , token:string) => {
  console.log("Active createGroup api/passwords/group.ts");
  const config = {
    headers: {
      Authorization: 'JWT ' + token
    }
  }

  return await axios.post(BASEURL, data, config);
}

