import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取产品线及获取项目名称
export const getProduct = (params) => {
  return axios(apis.project.getProduct, params);
}

// 获取项目列表
export const getProject = (params) => {
  return axios(apis.project.getProject, params);
}

// 导出项目列表
export const getExportProjectList = (params) => {
  return axios(apis.project.getExportProjectList, params);
}

