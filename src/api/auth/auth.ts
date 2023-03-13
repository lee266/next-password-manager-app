import axios from "axios"

type resetPasswordData = {
  email: string
}

type resetPasswordConfirmData = {
  new_password: string,
  re_new_password: string,
  uid: string,
  token: string,
}

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/`;
const RESET_PASSWORD_URL = BASEURL + 'users/reset_password/';
const RESET_PASSWORD_CONFIRM_URL = BASEURL + 'users/reset_password_confirm/';

export const resetPassword = async(data:resetPasswordData) => {
  return await axios.post(RESET_PASSWORD_URL, data);
}

export const resetPasswordConfirm = async(data:resetPasswordConfirmData) => {
  return await axios.post(RESET_PASSWORD_CONFIRM_URL, data);
}
