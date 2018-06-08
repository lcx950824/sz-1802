/*
随机数

参数：n,m 都是数字

 */
function numRandom(n,m){
	return parseInt(n+Math.random()*(m-n+1));
}

//冒泡排序
function bubble(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){	
		for(var j=0;j<arr.length-i-1;j++){

			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr;
}
//选择排序
function selectSort(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

//随机颜色rgb
function colorRandom(){
	var r = numRandom(0,255)
	var g = numRandom(0,255)
	var b = numRandom(0,255)

	return "rgb("+r+","+g+","+b+")"

}

//随机颜色2
function colorT2Random(){
		var r = numRandom(0,255)
		var g = numRandom(0,255)
		var b = numRandom(0,255)
		
		return "#"+insertZero(r,g,b);
	}

	function insertZero(R,G,B){
		R = R.toString(16).length>=2?R.toString(16):"0"+R.toString(16)
		G = G.toString(16).length>=2?G.toString(16):"0"+G.toString(16)
		B = B.toString(16).length>=2?B.toString(16):"0"+B.toString(16)
		
		return R+G+B
}
//随机验证码
function codeRandom () {
	var str = "";
	for(var i=0;i<6;i++){
		var n = parseInt(48+Math.random()*(122-48+1));	
		while(n>=58 && n<=64 || n>=91 && n<=96){
			 n = parseInt(48+Math.random()*(122-48+1));
		}
		var char = String.fromCharCode(n);

		str+=char;
	}
	return str;
}

//将时间对象转换为字符串
function dateString(d,sign){
	sign = sign?sign:"/"
	
	return d.getFullYear()+sign+reZero((d.getMonth()+1))+sign+reZero(d.getDate())+" "+reZero(d.getHours())+":"+reZero(d.getMinutes())+":"+reZero(d.getSeconds());
}

function reZero(n){
	if(n<10){
		n = "0"+n;
	}
	return n;
}


//获取非行间样式
function getStyle(ele,attr) {
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr]
	}
}
//设置和获取自定义属性
function attr(){
	if(arguments.length==2){
		return arguments[0].getAttribute(arguments[1])
	}else if(arguments.length==3){
		arguments[0].setAttribute(arguments[1],arguments[2])
	}else{
		return;
	}
}
//获取当前元素距离页面之间的偏移量
function offset(ele){
	var obj = {};
	obj.l = ele.offsetLeft;
	obj.t = ele.offsetTop;

	while(ele.offsetParent){
		ele = ele.offsetParent;
		obj.l += ele.offsetLeft;
		obj.t += ele.offsetTop; 
	}

	return obj;
}

function getCookie(name){
    var cookie = document.cookie;
    var arr = cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        var newArr = arr[i].split("=");
        if(name == newArr[0]){
            return newArr[1];
        }
    }

}


function setCookie(_name,val,expires){
    var d = new Date();
    d.setDate(d.getDate()+expires);
    console.log(d)
    document.cookie = _name+"="+val+";path=/;expires="+d;
}

function removeCookie(_name,val){
    setCookie(_name,val,-1);
}


//运动框架
function getStyle(obj,attr){
	if(obj.currentStyle){
		 return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];

	}
}

function move(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){
			//第一步算元素的初始值
			var iCur = 0;
			//判断属性是否为透明度
			if(attr == "opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100)
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}


			//算速度
			var speed = (json[attr]-iCur)/8;
			//速度取整
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			
			//判断是否都已经到达目的地
			if(iCur != json[attr]){
				bStop = false;
			}


			//运动原理
			if(attr == "opacity"){
				obj.style.opacity = (iCur+speed)/100;
				obj.style.filter = "alpha(opacity:"+(iCur+speed)+")"
			}else{
				obj.style[attr] = iCur+speed+"px";
			}
			
		}

		if(bStop){
			clearInterval(obj.timer);
			fn&&fn();
		}
	},30)
}


//封装ajax
function ajax(method,url,data,success,error){
	var xml = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
	var str = "";
	if(method == "get"){
		for(var key in data){
			str+="&"+key+"="+data[key];
		}
		str = str.substr(1);
		url = url+"?"+str;
		xml.open("get",url,true);
		xml.send();
	}else{
		for(var key in data){
			str+="&"+key+"="+data[key];
		}
		str = str.substr(1);
		xml.open("post",url,true);
		xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xml.send(str);
		
	}
	xml.onreadystatechange = function(){
		if(xml.readyState == 4 && xml.status == 200){
			var d = xml.responseText;
			success&&success(d);
		}else{
			error&&error(xml.status)
		}
	}
}