import apis from '@/config/api';

import axios from '@/libs/axios';


// 获取部门
export const getDepartment = (params) => {
  return axios(apis.department.getDepartment, params);
}


// 获取项目成员效率
export const getMemberEffect = (params) => {
  return axios(apis.department.getMemberEffect, params);
}
