import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取项目参与人员列表
export const getProjectPersonnel = (params) => {
  return axios(apis.projectPersonnel.getProjectPersonnel, params);
}

//获取项目信息
export const getProjectInfor = (params) => {
  return axios(apis.projectPersonnel.getProjectInfor, params);
}

//人员参与中的项目
export const getProjectingPersonnel = (params) => {
  return axios(apis.projectPersonnel.getProjectingPersonnel, params);
}
