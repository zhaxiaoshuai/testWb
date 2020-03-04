import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取人员概况表
export const getPersonnel = (params) => {
  return axios(apis.getPersonnel, params);
}
