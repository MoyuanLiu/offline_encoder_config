/*
* @Author: myliu
* @Date:   2017-10-19 14:59:02
* @Last Modified time: 2017-11-14 09:34:10
*/




'use strict';
 
/*
 * 根据模板生成解析页面
 * ************************************************************
 */

var template = localStorage.code_template;
var body = document.body;
if (template != null && template.toString() != '') {
	//构建表格主体
	var div_main = document.createElement('div');
	div_main.id = 'main';
	var tab_template = document.createElement('table');
	tab_template.id = 'tab_template';
	var br = document.createElement('br');
	div_main.appendChild(tab_template);
	div_main.appendChild(br);
	template = JSON.parse(template);
	//循环添加编码指标
	for (var i = 0; i < template.length; i++) {
		var row = tab_template.insertRow();
		var label_cell = row.insertCell();
		//添加指标名称
		var label_field = document.createElement('label');
		label_field.innerText = template[i]['col_show_name'];
		var input_hidden = document.createElement('input');
		input_hidden.type = 'hidden';
		input_hidden.className = 'hid_name';
		input_hidden.value = template[i]['col_name'];
		label_cell.appendChild(label_field);
		label_cell.appendChild(input_hidden);
		//添加指标内容
		var input_cell = row.insertCell();
		
		//显示指标内容
		var col_show_type = template[i]['col_show_type'];
		var field_input = document.createElement('input');
		if(col_show_type == 'text'){
			//如果显示方式为文本格式
			field_input = document.createElement('input');
			field_input.type = 'text';
			field_input.className = 'content';
		}else if(col_show_type == 'select'){
			//如果显示方式为下拉文本框格式
			field_input = document.createElement('select');
			var col_content_arr = template[i]['col_content'].split(';');
			for (var j = 0; j < col_content_arr.length; j++) {
				var field_input_sub = document.createElement('option');
				field_input_sub.value = col_content_arr[j].split(',')[1];
				field_input_sub.innerText = col_content_arr[j].split(',')[0];
				field_input.appendChild(field_input_sub);
			}
			field_input.className = 'content';
		}else if(col_show_type == 'checkbox'){
			//如果显示方式为多选框
			field_input = document.createElement('div');
			var col_content_arr = template[i]['col_content'].split(';');
			for (var k = 0; k < col_content_arr.length; k++) {
				field_input_sub = document.createElement('input');
				field_input_sub.type = 'checkbox';
				field_input_sub.value = col_content_arr[k].split(',')[1];
				field_input_sub.onclick = clickCheckbox;
				var field_input_span = document.createElement('span');
				field_input_span.innerText = col_content_arr[k].split(',')[0];
				var field_input_br = document.createElement('br');
				field_input.appendChild(field_input_sub);
				field_input.appendChild(field_input_span);
				field_input.appendChild(field_input_br);
			}
		}
		input_cell.appendChild(field_input);
	}

	//生成编码按钮
	var btn_encode = document.createElement('input');
	btn_encode.id='btn_encode';
	btn_encode.type = 'button';
	btn_encode.value = '编码';
	btn_encode.onclick = getEncode;
	//显示生成编码框
	var txt_code = document.createElement('input');
	txt_code.id='txt_code';
	txt_code.type = 'text';
	txt_code.readonly='readonly';
	
	var lastrow = tab_template.insertRow();
	var btncell = lastrow.insertCell();
	var codecell = lastrow.insertCell();
	btncell.appendChild(btn_encode);
	codecell.appendChild(txt_code);
	/*
	div_main.appendChild(btn_encode);
	div_main.appendChild(br);
	div_main.appendChild(txt_code);
	*/

	body.appendChild(div_main);
}




/*
 * 多选框点击事件
 * ************************************************************
 */
function clickCheckbox(sender) {
	var current_focus = document.activeElement;
	if(current_focus.classList.contains('content')){
		current_focus.classList.remove('content');
	}else{
		current_focus.classList.add('content');
	}

}
/*
 * 编码生成按钮点击事件
 * ************************************************************
 */
 function getEncode(sender)
 {
 	
 	var templateTable = document.getElementById('tab_template');
 	var trs = templateTable.getElementsByTagName('tr');

 	var code = "";
 	for(var i = 0;i<trs.length;i++) {
		var values = trs[i].getElementsByClassName('content');
		for(var j = 0;j<values.length;j++){
			code += values[j].value;
		}
 	}
 	var txt_code = document.getElementById('txt_code');
 	txt_code.value = code;
 	txt_code.innerText = code;
 	alert("生成的编码为:"+code);
 }