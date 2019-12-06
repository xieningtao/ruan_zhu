
function resizeThisIframe(){
    //alert("cc");
	//var w_h = document.getElementById("bodydiv").offsetHeight;
	//var w_w = document.getElementById("bodydiv").offsetWidth;
	//var w_h=document.body.clientHeight
   var w_h = document.body.scrollHeight;
	var w_w = document.body.scrollWidth;
	var thisIframeId = getIframeIdByURLParam(window.location.href);
   // alert(thisIframeId+":"+w_h+":"+w_w);
	if(thisIframeId){
		eval("window.parent.document.all."+thisIframeId+".height = "+w_h);
		eval("window.parent.document.all."+thisIframeId+".width = "+w_w);
	}
}
function getIframeIdByURLParam(url){
	url = url.substr(url.lastIndexOf("?")+1);
	var paramArr = url.split("&");
	for(var i=0; i<paramArr.length; i++){
		if(paramArr[i].indexOf("iframeId") != -1){
			return (paramArr[i].split("="))[1];
		}
	}
	return "";
}
