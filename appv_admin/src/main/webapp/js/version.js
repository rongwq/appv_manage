/**
 * app版本管理
 */

$(function() {
	initPage();//初始化分页
	initQueryForm();
	initDelete();
	initUploadFile();
});

/**
 * 上传文件
 */
function initUploadFile(){
	$("#file").fileupload({
		url : getRootPath() + "/file/upload?type=file",
		dataType: 'json',
		change: function(e, data) {
			$('#my-modal-loading').modal('open');
            if(data.files.length > 1){
                alert("一次只能选择一个文件上传");
                return false;
            }
        },
        done: function (e, data) {
        	var file = data.result.file;
        	var fileSrc = file.url;
        	$("#downloadUrl").val(fileSrc);
        	var size = file.size;
        	var fileName = fileSrc.substring(fileSrc.lastIndexOf("/") + 1);
        	$(e.target).before("<span class='am-badge' name='file'>" + fileName + "</span>");
        	$("#fileSize").val(size);
        	$("#isFile").val("1");
        	$(e.target).before("<a class='am-close am-close-alt am-icon-times'onclick='delFile(\"" + fileName + "\",this)'/>");
        	var spans = $(e.target).siblings("span");
        	if($(e.target).data("number")) {
        		if(spans.length >= $(e.target).data("number")){
        			$(e.target).attr("disabled", true);
        		}
        	}
        },
        progressall: function (e, data) {//进度条
        	 var progress = parseInt(data.loaded / data.total * 100, 10);
        	 $('#loading-txt').html("正在上传..."+progress+"%");
        },fail : function(e,data){//异常处理
        	alert("文件上传异常");
        },always: function (e,data){
        	$('#my-modal-loading').modal('close');
        }
	});
	
	var showFile = $("#showFile");
	var fileNameVal = $("#showFile").val();
	var isFile = $("#isFile").val();
	if(isFile) {
		var fileName = fileNameVal.substring(fileNameVal.lastIndexOf("/") + 1);
		$(showFile).after("<a class='am-close am-close-alt am-icon-times' onclick='delFile(\"" + fileName + "\",this)'/>");
		$(showFile).after("<span class='am-badge' name='file'>" + fileName + "</span>");
		$("#file").attr("disabled", true);
	}
}

function delFile(fileName, element){
	$.ajax({
		url : getRootPath() + "/file/delete",
		data : {"fileName" : fileName,"fileType" : "file"},
		dataType: "text",
		success: function(data) {
			$(element).prev().remove();
			$("#file").removeAttr("disabled");
			$("#isFile").val("0");
			$("#url").val("");
			$(element).remove();
		}
	});
}


/**
 * 初始化删除事件
 */
function initDelete(){
	$("button[name='delBtn']").on('click', function() {
		$('#confirm_msg').text("确定删除该app版本？");
	      $('#my_confirm').modal({
	        relatedTarget: this,
	        onConfirm: function(options) {
	        	var $link = $(this.relatedTarget);
	        	$.ajax({
	           		url:getRootPath()+"/appv/versionDelete",
	           		data:{"id":$link.data("id")},
	           		dataType:"text",
	           		success:function(data){
	           			$('#my_confirm').modal("close");
	           			var obj = jQuery.parseJSON(data);
	           			alert(obj.resultDes);
	           			if(obj.resultCode == '1'){
	           				doQuery();
	           			}
	           		}
	           	})
	        }
	      });
	    });
}

/**
 * 启用事件
 */
function enable(id) {
	$.ajax({
		url : getRootPath() + "/appv/versionEnable",
		data : {
			"id" : id
		},
		dataType : "text",
		success : function(data) {
			var obj = jQuery.parseJSON(data);
			alert(obj.resultDes);
			if (obj.resultCode == '1') {
				doQuery();
			}
		}
	});
}

/**
 * 禁用事件
 */
function disable(id) {
	$.ajax({
		url : getRootPath() + "/appv/versionDisable",
		data : {
			"id" : id
		},
		dataType : "text",
		success : function(data) {
			var obj = jQuery.parseJSON(data);
			alert(obj.resultDes);
			if (obj.resultCode == '1') {
				doQuery();
			}
		}
	});
}


