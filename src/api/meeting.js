import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取会议
export const getMeeting = (params) => {
  return axios(apis.meeting.getMeeting, params);
}

//添加事项
export const addMatter = (params) => {
  return axios(apis.meeting.addMatter, params);
}

//获取会议
export const getMeetingName = (params) => {
  return axios(apis.meeting.getMeetingName, params);
}

//删除事项
export const deleteMatter = (params) => {
  return axios(apis.meeting.deleteMatter, params);
}

//根据事项ID查询事项
export const getMatterByMatterId = (params) => {
  return axios(apis.meeting.getMatterByMatterId, params);
}

//更新事项
export const updateMatter = (params) => {
  return axios(apis.meeting.updateMatter, params);
}



