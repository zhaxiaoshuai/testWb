
const APIPREFIX = process.env.NODE_ENV === 'production'? 'http://172.16.9.1:20031':'';

/**
 * API 列表，最多允许两层嵌套
 * @type {Object}
 */
const apis = {
  /*网页链接列表*/
  // getLeftBar:  "/static/data/get-leftbar.json",

  //开发绩效
  devAssess: {
   
    getProjectById: "/project/account/register",
    getUserList: "/project/account/getUserList",
    getUserDetail: "/project/account/getUserDetail",
    login: "/project/account/login",
    getContentExcelList: "/project/account/getContentExcelList",
    updateUpdateTheColumnValueForContentExcelList: "/project/account/updateUpdateTheColumnValueForContentExcelList",
    changePassword: "/project/account/changePassword",
    clearContentExcel: "/project/account/clearContentExcel",
    lookUpColumnOfContentExcel: "/project/account/lookUpColumnOfContentExcel",
    addEmployee: "/project/account/addEmployee",
    deleteEmployee: "/project/account/deleteEmployee",
    addColumnName: "/project/account/addColumnName",
    deleteColumnName: "/project/account/deleteColumnName",
    modifyTheColumnName: "/project/account/modifyTheColumnName",
    // carnumUpload: "/wechat/imageAnalys/white/carnumUpload",
    carnumUpload: "/wechat/imageAnalys/white/test1",
    jssdkSign: "/wechat/jssdk/sign?url="+window.location.href



  },

  
};

/**
 * 填充 API 前缀
 * @param  {[type]} api [description]
 * @return {[type]}     [description]
 */
const fillPrefix = function (api) {
  if (typeof api === 'string') {
    api = APIPREFIX + api;
  } else {
    const keys = Object.keys(api);
    keys.forEach((key) => {
      const value = api[key];
      if(typeof value === 'string' && value.indexOf('.json')<0){
      	api[key] = fillPrefix(value);
      }
    });
  }

  return api;
};

export default fillPrefix(apis);

