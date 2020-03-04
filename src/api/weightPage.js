import apis from '@/config/api';
import axios from '@/libs/axios';


//获取项目难度等级
export const getDiffcultyLevel = (params) => {
  return axios(apis.weightLevel.getDifficultyInfor, params);
}

// 获取项目信息
export const getProjectById = (params) => {
  return axios(apis.devAssess.getProjectById, params);
}

// 获取开发人员考核数据表
export const getDevAssess = (params) => {
  return axios(apis.devAssess.getDevAssess, params);
}

// 开发人员年度考核数据表
export const getDevAssessYear = (params) => {
  return axios(apis.devAssess.getDevAssessYear, params);
}

// 开发项目考核数据表
export const getDevAssessProject = (params) => {
  return axios(apis.devAssess.getDevAssessProject, params);
}

// Owner项目考核数据表
export const getDevAssessOwner = (params) => {
  return axios(apis.devAssess.getDevAssessOwner, params);
}

// Owner项目考核数据表
export const getDevAssessOPS = (params) => {
  return axios(apis.devAssess.getDevAssessOPS, params);
}

// 获取类型
export const getListByType = (params) => {
  return axios(apis.devAssess.getListByType, params);
}

// 项目成员任务有效工时及任务完成基本效率统计图
export const getProjectChart = (params) => {
  return axios(apis.devAssess.getProjectChart, params);
}

export const getProjectNameChart = (params) => {
  return axios(apis.devAssess.getProjectNameChart, params);
}
