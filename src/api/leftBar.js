import apis from '@/config/api';
import axios from '@/libs/axios';

// 获取左侧导航
export const getLeftBar = () => {
  return axios(apis.getLeftBar);
}
