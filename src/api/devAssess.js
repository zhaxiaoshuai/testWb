import apis from '@/config/api';
import axios from '@/libs/axios';
// import apis from '@/api'
// 
export const getProjectById = (params) => {
  return axios(apis.devAssess.getProjectById, params);
}
export const getUserList = (params) => {
  return axios(apis.devAssess.getUserList, params);
}
export const getUserDetail = (params) => {
  return axios(apis.devAssess.getUserDetail, params);
}
export const login = (params) => {
  return axios(apis.devAssess.login, params);
}
export const getContentExcelList = (params) => {
  return axios(apis.devAssess.getContentExcelList, params);
}

export const updateUpdateTheColumnValueForContentExcelList = (params) => {
  return axios(apis.devAssess.updateUpdateTheColumnValueForContentExcelList, params);
}
export const changePassword = (params) => {
  return axios(apis.devAssess.changePassword, params);
}

export const clearContentExcel = () => {
  return axios(apis.devAssess.clearContentExcel);
}
export const lookUpColumnOfContentExcel = (params) => {
  return axios(apis.devAssess.lookUpColumnOfContentExcel, params);
}

export const addEmployee = (params) => {
  return axios(apis.devAssess.addEmployee, params);
}

export const deleteEmployee = (params) => {
  return axios(apis.devAssess.deleteEmployee, params);
}

export const addColumnName = (params) => {
  return axios(apis.devAssess.addColumnName, params);
}

export const deleteColumnName = (params) => {
  return axios(apis.devAssess.deleteColumnName, params);
}

export const modifyTheColumnName = (params) => {
  return axios(apis.devAssess.modifyTheColumnName, params);
}

export const carnumUpload = (params) => {
  // let config = {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // };  //添加请求头
  // return axios.post(apis.devAssess.params, config);

  // axios.post('url/', param, config)
  return axios(apis.devAssess.carnumUpload, params);
}

export const jssdkSign = (params) => {
  
  return axios(apis.devAssess.jssdkSign, params);
}


/*var websocket = null;
var username = localStorage.getItem("name");

//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket("ws://" + "192.168.2.140:8888" + "/WebChat/websocket/" + "QiBoss" + "/"+ _img);
} else {
    alert('当前浏览器 Not support websocket')
}

//连接发生错误的回调方法
websocket.onerror = function() {
    setMessageInnerHTML("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function() {
    setMessageInnerHTML("WebSocket连接成功");
}

//接收到消息的回调方法
websocket.onmessage = function(event) {
    setMessageInnerHTML(event.data);
}

//连接关闭的回调方法
websocket.onclose = function() {
    setMessageInnerHTML("WebSocket连接关闭");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
    closeWebSocket();
}

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}  */