/*
* @Author: myliu
* @Date:   2017-10-17 17:24:32
* @Last Modified by:   lisiyu
* @Last Modified time: 2017-11-16 17:20:26
*/
/*
 * 初始化配置信息部分
 * ************************************************************
 */
var username = localStorage.username;
if(username != null){
	//document.getElementById('txt_username').placeholder = username;
	document.getElementById('txt_username').value = username;
}
loadTemplate();//加载模板列表



/*
 * 保存用户名按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_saveusername').onclick = function(){
	if (document.getElementById('txt_username').value == null || document.getElementById('txt_username').value == '') {
		alert('用户名不能为空');
	}else {
		var name = document.getElementById('txt_username').value;
		if (name != localStorage.username) {
			localStorage.username = name;
			alert('用户名已修改为' + localStorage.username);
			console.log('用户名已修改为' + localStorage.username);
		}
	}
}
/*
 * 保存按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_save').onclick = function(){
		localStorage.code_template='';
		var templateTable = document.getElementById('tab_template');
		var trs = templateTable.getElementsByTagName('tr');
		if(trs.length > 1){
			for (var i = 1; i < trs.length; i++) {
				var col_name = trs[i].childNodes[1].childNodes[0].value;
				var col_show_name = trs[i].childNodes[2].childNodes[0].value;
				var col_show_type = trs[i].childNodes[3].childNodes[0].value;
				var col_content = trs[i].childNodes[4].childNodes[0].value;

				var fieldinfo = {};
				fieldinfo['col_name'] = col_name;
				fieldinfo['col_show_name'] = col_show_name;
				fieldinfo['col_show_type'] = col_show_type;
				fieldinfo['col_content'] = col_content;
				console.log('规则信息：' + fieldinfo['col_name'] + ',' + fieldinfo['col_show_name'] + ',' + fieldinfo['col_show_type'] + ',' + fieldinfo['col_content']);
				saveFieldInfo(fieldinfo);
			}
		}
alert('保存成功');
console.log('设置保存成功');
}
/*
 * 添加规则按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_addfield').onclick = function(){
	var data = localStorage.data;
	if(data != null && data.toString() != ''){
		alert('当前还有未提交或导出的数据，不能随意修改模板！！！');
		return;
	}
	var new_tr = document.getElementById('tab_template').insertRow();
	var new_tr_index = new_tr.rowIndex;
	new_tr.innerHTML = "<td>" + new_tr_index + "</td><td><input type='text' width='200px' height='30px' name='fieldname' value='' placeholder='规则名称'/></td><td><input type='text' width='200px' height='30px' name='fieldshowname' value='' placeholder='规则显示名称'/></td><td><select name='fieldshowtype'><option value='text' >文本类型</option><option value='checkbox'>多选框</option><option value='select' selected='selected'>下拉列表</option></select></td><td><input type='text' width='200px' height='30px' name='fieldcontent' value='' placeholder='规则内容'/></td>";
}
/*
 * 删除规则按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_delfield').onclick = function(){
	var templateTable = document.getElementById('tab_template');
	var trs = templateTable.getElementsByTagName('tr');
	if (trs.length > 1) {
		templateTable.deleteRow(trs.length - 1);
	}
}

/*
 * 保存规则信息方法
 * ************************************************************
 */
function saveFieldInfo(fieldinfo){
	if (fieldinfo == null || fieldinfo.toString() == '') {
		return;
	}else{
		var template = localStorage.code_template;
		if(template == null || template.toString() == '') {
			template = [];
			template.push(fieldinfo);
			localStorage.code_template = JSON.stringify(template);
		}else {
			template = JSON.parse(template);
			template.push(fieldinfo);
			localStorage.code_template = JSON.stringify(template);
		}

	}
}
/*
 * 导出模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_exporttemplate').onclick = function(){
	var template = localStorage.code_template;
	if(template == null || template.toString() == ''){
		alert('当前没有配置模板');
	}else{
		console.log('导出模板');
		prompt('当前的模板代码',template);
	}	
}
/*
 * 清空模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_cleartemplate').onclick = function(){
	var cleartemplate_confirm = confirm('是否清空模板？');
	if (cleartemplate_confirm) {
		localStorage.code_template = '';
		var templateTable = document.getElementById('tab_template');
		var trs = templateTable.getElementsByTagName('tr');
		while (trs.length > 1) {
			templateTable.deleteRow(trs.length - 1);
		}
	}		
}
/*
 * 导入模板按钮点击事件
 * ************************************************************
 */
document.getElementById('btn_importtemplate').onclick = function(){
	var template = localStorage.code_template;
	if(template != null && template.toString() != ''){
		var overwrite = confirm('当前已有模板，是否覆盖？');
		if (overwrite) {
			var new_template = prompt('导入模板代码');
			localStorage.code_template = new_template;
			loadTemplate();
			console.log('导入新模板：' + new_template);
		}
	}else{
		var new_template = prompt('导入模板代码');
		localStorage.code_template = new_template;
		loadTemplate();
		console.log('导入新模板：' + new_template);
	}

}
/*
 * 加载模板方法
 * ************************************************************
 */
function loadTemplate(){
	var template = localStorage.code_template;
	var templateTable = document.getElementById('tab_template');
	var trs = templateTable.getElementsByTagName('tr');
	while (trs.length > 1) {
		templateTable.deleteRow(trs.length - 1);
	}
	if(template == null || template.toString() == ''){
		return;
	}else{
		template = JSON.parse(template);
		for (var i = 0; i < template.length; i++) {
			var new_tr = templateTable.insertRow();
			var new_tr_index = new_tr.rowIndex;
			new_tr.innerHTML = "<td>" + new_tr_index + "</td><td><input type='text' width='200px' height='30px' value='" + template[i]['col_name'] + "'/></td><td><input type='text' width='200px' height='30px' value='" + template[i]['col_show_name'] + "'/></td>";
			if (template[i]['col_show_type'] == 'text') {
				new_tr.innerHTML += "<td><select name='fieldshowtype'><option value='text' selected='selected'>文本类型</option><option value='checkbox'>多选框</option><option value='select'>下拉列表</option></select></td>";
			}else if (template[i]['col_show_type'] == 'checkbox') {
				new_tr.innerHTML += "<td><select name='fieldshowtype'><option value='text' >文本类型</option><option value='checkbox' selected='selected'>多选框</option><option value='select'>下拉列表</option></select></td>";
			}else if (template[i]['col_show_type'] == 'select') {
				new_tr.innerHTML += "<td><select name='fieldshowtype'><option value='text' >文本类型</option><option value='checkbox' >多选框</option><option value='select' selected='selected'>下拉列表</option></select></td>";
			}
			new_tr.innerHTML += "<td><input type='text' width='200px' height='30px' value='" + template[i]['col_content'] + "'/></td>";
		}
	}
}
