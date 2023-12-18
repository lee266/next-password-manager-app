import axios from 'axios';
import { Inquiry } from 'types/models/Inquiry';

const BASEURL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/`;

// Get
export const getInquiryCategories = async (token: string) => {
  const url = `${BASEURL}inquiryCategories/`;
  const config = { headers: { Authorization: 'JWT ' + token } };
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create
export const createInquiry = async (data: Inquiry, token: string) => {
  const config = { headers: { Authorization: 'JWT ' + token } };
  const url = `${BASEURL}inquiry/`;
  return await axios.post(url, data, config);
};
