/**
 * 后台脚本
 */

 /*
  *初始化启动
  ******************************************
  **/
  var userName = localStorage.username;
  var recordcount = localStorage.recordcount;
  var code_template = localStorage.code_template;
  if (userName == null) {
  	localStorage.username = 'username';//用户名默认username
  }

  if (code_template == null) {
	  localStorage.code_template = '';
  }
  if (recordcount == null) {
    localStorage.recordcount = 0;//默认记录数为0
  }


  //桌面提示参数
  	var mail_opt={
        type: "list",
        title: "规则编码解码器",
        message: "规则编码解码器已启动",
        iconUrl: "../icon/icon.PNG",
        items: [
        	{ title: "1.", message: "当前用户："+localStorage.username}
				]
      };
    if(code_template==''){//当模板没有配置的时候提示在设置中配置
  		mail_opt = {
        	type: "list",
        	title: "规则编码解码器",
       		message: "规则编码解码器已启动",
        	iconUrl: "../icon/icon.PNG",
        	items: [
        		{ title: "1.", message: "当前用户："+localStorage.username},
				{ title: "2.", message: "模板尚未配置，请在插件设置中配置"}
					]
      }
  }
/*
 * 桌面提醒插件已启动
 * ******************************
 * */
    chrome.notifications.create('start',mail_opt,function(id){
	  setTimeout(function(){  
      chrome.notifications.clear(id, function(){});  
  		}, 3000);//3秒自动消失  
	  });


 /*
 * 插件点击显示隐藏提取页面事件
 * ******************************
 * */ 
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true,  currentWindow: true},
      function(activeTabs) {
  chrome.tabs.sendMessage(tab.id, {type:'showHide'});
});
});


  







