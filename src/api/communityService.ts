import axios from 'axios';
import { FetchCommunityPayload } from '../types';

const API_BASE_URL = 'https://api-dev.cbcp.app'; // Replace with your actual API base URL

export const fetchCommunityApi = async (payload:FetchCommunityPayload) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/communities/all`,{headers:{page:payload.page,limit:payload.limit}});
    return response.data;
  } catch (error) {
    // You can re-throw the error or return error.response for saga to handle
    throw error; 
  }
};