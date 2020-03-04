import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取项目信息
export const getProjectById = (params) => {
  return axios(apis.devAssess.getProjectById, params);
}

//获取开发人员考核数据表
export const getTestAssess = (params) => {
  return axios(apis.testAssess.gettestAssess, params);
}

//获取类型
export const getListByType = (params) => {
  return axios(apis.testAssess.getListByType, params);
}
