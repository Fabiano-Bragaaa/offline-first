import { API_URL } from '@env';
import axios from 'axios';

export type ApiConfig = {
  baseURL: string;
};

export function getApiConfig(): ApiConfig {
  return {
    baseURL: API_URL,
  };
}

const {baseURL} = getApiConfig();

export const api = axios.create({
  baseURL,
});