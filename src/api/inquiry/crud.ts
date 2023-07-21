import axios from "axios"
import { Inquiry } from "types/models/Inquiry";

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/inquiries/`;


// Create
export const createInquiry = async (data: Inquiry) => {
  return await axios.post(BASEURL, data);
}
