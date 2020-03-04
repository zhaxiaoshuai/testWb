import apis from '@/config/api';
import axios from '@/libs/axios';

export const getLogin= (params) => {
  return axios(apis.getLogin, params);
}