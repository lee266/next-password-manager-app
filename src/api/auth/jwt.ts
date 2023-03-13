import axios from "axios"

type PostType = {
  email: string
  password: string
}

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/`;
const URL_CRETE = BASEURL + 'create';
const URL_VERIFY = BASEURL + 'verify';

export const createJwt = async(data:PostType) => {
  return await axios.post(URL_CRETE, data)
}

export const verifyJwt = async(jwt:string) => {
  const data = {
    'token': jwt
  }
  const response = await axios.post(URL_VERIFY, data)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    });
  return response
}


