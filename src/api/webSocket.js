/**
 * Created by jerry on 2017/4/13.
 */
var websocket = null;  
var username = localStorage.getItem("name");  
  
//判断当前浏览器是否支持WebSocket  
   /* if ('WebSocket' in window) {  
   // websocket = new WebSocket("ws://" + var user = sessionStorage.getItem('access-user');"192.168.2.140:8888" + "/WebChat/websocket/" + username + "/");
   
    var user = sessionStorage.getItem('access-user');
    user = JSON.parse(user);

       if (user) {
         websocket = new WebSocket("ws://192.168.2.140:8888/websocket/" + user.username); 

       }else {
    	 websocket = new WebSocket("ws://192.168.2.140:8888/websocket/wumingshi"); 

       }

    } else {  
         alert('当前浏览器 Not support websocket');  
    }  */


  
//关闭WebSocket连接  
export function closeWebSocket() {  
	/*alert("关闭WebSocket连接");*/
    websocket.close();  
}  

//新建WebSocket连接  
export function createWebSocket() {  

	//判断当前浏览器是否支持WebSocket  
    if ('WebSocket' in window) {  
/*    websocket = new WebSocket("ws://" + var user = sessionStorage.getItem('access-user');"192.168.2.140:8888" + "/WebChat/websocket/" + username + "/");
*/   
    var user = sessionStorage.getItem('access-user');
    	user = JSON.parse(user);

    if (user) {
         // websocket = new WebSocket("ws://39.105.156.101:8888/websocket/" + user.username); 
         websocket = new WebSocket("ws://127.0.0.1:8888/websocket/" + user.username); 

    }else {
    	 // websocket = new WebSocket("ws://39.105.156.101:8888/websocket/wumingshi");
       websocket = new WebSocket("ws://127.0.0.1:8888/websocket/wumingshi"); 

    }

    } else {  
         alert('当前浏览器 Not support websocket');  
    } 

    //连接发生错误的回调方法  
   websocket.onerror = function() {  
  	/*alert("WebSocket连接发生错误");  */
   /*    setMessageInnerHTML("WebSocket连接发生错误");  
    */
   };  
  
//连接成功建立的回调方法  
   websocket.onopen = function() {  
/*      alert("WebSocket连接成功");  
*/      
     var user = sessionStorage.getItem('access-user');
      user = JSON.parse(user);
      var message = "姓名:"+ user.name +"  版本信息:" +user.appVersion+"   ip:"+user.ip+"    latitude:"+user.latitude +"  longitude:"+user.longitude;
      sendWebSocketMessage1(message);

   }  
  
//接收到消息的回调方法  
  websocket.onmessage = function(event) { 
/*    alert(event.data);  
*/ 
     setMessageInnerHTML(event);  
  }  
  
  //连接关闭的回调方法  
  websocket.onclose = function() {  
  /*	alert("WebSocket连接关闭");  
  *//*    setMessageInnerHTML("WebSocket连接关闭");  
  */}  
  
  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
   window.onbeforeunload = function() {  
    closeWebSocket();  
   }   


  
} 
 
 export function sendWebSocketMessage(message) {  
      websocket.send(message);

}
 export const closeWebSocket1 = () => {
  return closeWebSocket();
}

 export const createWebSocket1 = () => {
  return createWebSocket();
}

 export const sendWebSocketMessage1 = (message) => {
  return sendWebSocketMessage(message);
}


/*//导出 {常量名、函数名}
export {closeWebSocket}*/