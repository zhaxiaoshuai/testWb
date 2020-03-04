import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取人员参与项目列表
export const getPersonnelProject = (params) => {
  return axios(apis.personnelProject.getPersonnelProject, params);
}

//获取人员信息
export const getPersonnelInfor = (params) => {
  return axios(apis.getPersonnel, params);
}


