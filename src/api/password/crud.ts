import axios from "axios"

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/passwords/`

type passwordManageData = {
  title: string
  password: string
  email: string
  notes: string
  tags: string
  website: string
  user: number
}

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

export const searchPasswords =async (user:object, token:string) => {
  console.log("Active searchPasswords api/passwords/crud.ts");
  console.log("request:user, token", user,token);
  
  const searchUrl = BASEURL + 'search/'
  const config = {
    headers: {
      Authorization: 'JWT ' + token
    }
  }
  return await axios.post(searchUrl, user, config)
}

export const createPassword =  async (data:passwordManageData, token:string) => {
  console.log("Active createPassword api/passwords/crud.ts");
  const config = {
    headers: {
      Authorization: 'JWT ' + token
    }
  }
  return await axios.post(BASEURL, data, config);
}
