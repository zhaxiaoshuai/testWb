import axios from 'axios';
import Vue from 'vue';

//const baseurl = 'http://192.168.25.63:8091/';

const createAxios = function(api,param){
  var localJson = api.indexOf('.json') > -1;

  return axios({
    method: localJson ? 'get' : 'post',
    url: api,
    data: param
  }).then((data)=>{
    return data.data;
  })
}

// export default createAxios;



/* 获取本地缓存的 token 策略 */
function getToken() {
  return sessionStorage.getItem("token");
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = "http://phone.viphk1.ngrok.org";
// axios.defaults.baseURL = "http://172.16.9.1:8081";
axios.defaults.baseURL = "http://phone.viphk1.ngrok.org/qlb"; //dev环境

// axios.defaults.baseURL = "http://172.16.122.16:20031";
axios.defaults.headers.common['WXAuthorization'] = getToken();
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  //baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    axios.defaults.headers.common['WXAuthorization'] = getToken();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;