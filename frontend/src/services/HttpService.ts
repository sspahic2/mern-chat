import axios, { AxiosError } from "axios"
import ApiResponse from "../types/ApiResponse";

const baseUrl = import.meta.env.BACKEND_URL == '' || import.meta.env.BACKEND_URL == '/' ? 'http://localhost:3000/api' : import.meta.env.BACKEND_URL;

const appendSlash = (url: string): string => {
  if(url.at(0) != '/') url = '/' + url;
  return url;
}

const postRequest = async(url: string, body: any): Promise<ApiResponse> => {
  url = appendSlash(url);

  try {
  const response = await axios({
    url: baseUrl + url,
    method: 'POST',
    withCredentials: true,
    data: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;

  }catch(e) {
    const error = e as AxiosError;
    return error.response?.data as ApiResponse;
  }
};

const getRequest = async(url: string): Promise<ApiResponse> => {
  url = appendSlash(url);

  try {
    const response = await axios({
      url: baseUrl + url,
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }catch(e) {
    const error = e as AxiosError;
    return error.response?.data as ApiResponse;
  }
}

export { postRequest, getRequest };