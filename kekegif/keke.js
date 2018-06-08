//三级菜单
var aLi=document.querySelectorAll(".lii");
var bLi=document.querySelectorAll(".List");
for(var i=0;i<aLi.length;i++){
	aLi[i].index=i;
	aLi[i].onmouseover = function(){
		this.children[1].style.display = "block";
		var child = this.children[1].children;
		if(this.index==0){		 
	        for(var j=0;j<child.length;j++){
	            child[j].onmouseover = function(){
	               	for(var k=0;k<child.length;k++){
	                    child[k].className = "";
	               	}						
	               	this.className = "active";	               	
					this.children[2].style.display="block";
					var son=this.children[2].children;
					for(var j=0;j<son.length;j++){
	            		son[j].onmouseover = function(){
	               			for(var k=0;k<son.length;k++){
	                    		son[k].className = "";
	               			}
	               			this.className = "hover";
	           			}
	           			son[j].onmouseout = function(){
	               			for(var k=0;k<son.length;k++){
	                    		son[k].className = "";
	               			}
	               		}	
	           		}	           		
	           	}
	            child[j].onmouseout = function(){
	               	for(var k=0;k<child.length;k++){
	                    child[k].className = "";
	               	}	               	
	               	this.children[2].style.display="none";	            	
	        	}
			}
		}else{
			for(var j=0;j<child.length;j++){
	            child[j].onmouseover = function(){

	               	for(var k=0;k<child.length;k++){
	                    child[k].className = "";
	               	}
	               	this.className = "active";
	            }
	             child[j].onmouseout = function(){
	               	for(var k=0;k<child.length;k++){
	                    child[k].className = "";
	               	}
	            }
	        }
		}
    }
	aLi[i].onmouseout = function(){	
       	this.children[1].style.display = "none";
    }
}


//轮播图；
var aLi = document.querySelectorAll("#banner>.auto>ul>li");
var banner = document.getElementById("banner");
var aDir = document.querySelectorAll("#direction>a");
var aBtn = document.querySelectorAll("#btn>a");
var dir = document.getElementById("direction");
var iNow = 0;
var Next = 0;
var timer = null;
for(var i=0;i<aBtn.length;i++){
	aBtn[i].index = i;
	aBtn[i].onmouseover = function(){
		for(var j=0;j<aBtn.length;j++){
			aBtn[j].className = "";
			move(aLi[j],{opacity:0})
		}
		this.className = "act";
		move(aLi[this.index],{opacity:100})
		Next = this.index;
		iNow = Next;
	}
}
aDir[0].onclick = function(){
	if(Next == 0){
		Next = aLi.length-1;
	}else{
		Next--
	}
	toImg()
}

aDir[1].onclick = function(){
	if(Next == aLi.length-1){
		Next = 0;
	}else{
		Next++;
	}
	toImg()
}
banner.onmouseover = function(){
	clearInterval(timer)
	dir.style.display="block"
}
banner.onmouseout = function(){
	autoPlay()
	dir.style.display="none"
}
autoPlay()
function autoPlay(){
	timer = setInterval(function(){
		if(Next == aLi.length-1){
			Next = 0;
		}else{
			Next++;
		}
		toImg ()
	},3000)
}
function toImg () {
	move(aLi[iNow],{opacity:0})
	move(aLi[Next],{opacity:100})
	iNow = Next; 
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].className = "";
	}
	aBtn[Next].className = "act";
}





//礼物分页
var p1 = new Promise(function(resolve,reject){
	ajax("get","keke.json",{},function(data) {
		var data = JSON.parse(data);
		var len = data.length;
		var pageNum = Math.ceil(len/16);	
		var obj = {
			data:data,
			len:len,
			pageNum:pageNum
		}
		resolve(obj)	
	})
})

p1.then(function(obj){
	var btn = document.querySelector(".btnList");
	var oBox = document.getElementById("box");
	var abtn=document.querySelectorAll(".abtn");
	page(1)
	function page(n){
		var str = "";
		for(var i=(n-1)*16;i<Math.min(obj.len,n*16);i++){
			str+=`<li class="myli" date-id=${obj.data[i].id}>
					<a href="##"  id="mylove"><div class="myle"></div></a>
					<a href="keke Detail Pages.html" class="pic_a1"><img src=${obj.data[i].img} class="iimg"></a>
					<a href="keke Detail Pages.html" class="word_a1">${obj.data[i].name}</a>
					<span class="span_1">¥</span><span class="span_2">${obj.data[i].price}</span><span class="span_3">${obj.data[i].style}</span>
				</li>`;
		}
		oBox.innerHTML = str;
		var myli=document.querySelectorAll(".myli")	
		for (var i = 0; i < myli.length; i++) {			
			myli[i].onmouseover=function(){				
				this.children[0].style.display = "block";
				child=this.children[0];
				child.onmouseover=function(){
					this.style.background="url(images/icon_all_04.png)"
				}
				child.onmouseout=function(){
					this.style.background="url(images/icon_all_06.png)"
				}
			}
			myli[i].onmouseout=function(){
				this.children[0].style.display = "none";
			}
		}
		
	}
	for(var i=0;i<abtn.length;i++){
		abtn[i].index=i;
		abtn[i].onclick = function(){
				for(var i=0;i<abtn.length;i++){
					abtn[i].style.color="#666"
				}
			this.style.color="#fd3636"
			page(this.index+1)
		}
	}
	var oNum={};
	var num=0;
	var osame={};
	oBox.onclick=function(e){
	    var e=e||event;
	    var target=e.target||e.srcElement;		    
	    if(target.tagName=="DIV" && target.className=="myle"){
	        var id=target.parentNode.parentNode.getAttribute("date-id");
	        if(oNum[id]){
	            oNum[id]++;
	        }else{
	            oNum[id]=1;
	            num++;
	        }
	        var date=JSON.stringify(oNum)	  
	        setCookie("init",date,5)
	        var gonum=document.getElementById("num")	        
	        gonum.innerHTML=num;
	        love_a1.style.background="url(images/icon_all_03.png)";
			love_a2.style.display="block";
	        var count = 0;
			var tir = setInterval(function() {
				count++;
				if(count==1){
					love_a1.style.background="url(images/icon_all_05.png)";
					love_a2.style.display="none";
					clearInterval(tir);
				}				
			},1000)
	    }
		if(target.tagName=="IMG" && target.className=="iimg"){			
			var id=target.parentNode.parentNode.getAttribute("date-id");
			osame[id]=1;
			var date=JSON.stringify(osame)	
			console.log(date)  
	        setCookie("init",date,5)
		}
		if(target.tagName=="A" && target.className=="word_a1"){			
			var id=target.parentNode.getAttribute("date-id");
			osame[id]=1;
			var date=JSON.stringify(osame)	
			console.log(date)  
	        setCookie("init",date,5)
		}
	}		
})






//头部固定和回到顶部
var otop=document.getElementById("top")
var tpic=document.getElementById("t_pic")
var tword=document.getElementsByClassName("ul1_a")
var fav=document.getElementById("fav")
var love_a1=document.getElementById("love_a1")
var love_a2=document.getElementById("love_a2")
var love_a3=document.getElementById("love_a3")
window.onscroll=function(){
	var t=document.documentElement.scrollTop||document.body.scrollTop;
	if(t>=100){
		otop.className="fix";
		tpic.src="images/img_03.jpg";
		for (var i = 0; i < tword.length; i++) {
			tword[i].style.color="#333";
		}
	}if(t<100){
		otop.className="top";
		tpic.src="images/icon_03.png";
		for (var i = 0; i < tword.length; i++) {
			tword[i].style.color="#fff";
		}
	}if(t>=700){
		love_a3.style.display="block";
	}if(t<700){
		love_a3.style.display="none";
	}
	love_a3.onclick=function(){
		document.documentElement.scrollTop=0
	}	
}
fav.onmouseover=function(){
	love_a1.style.background="url(images/icon_all_03.png)";
	love_a2.style.display="block";
}
fav.onmouseout=function(){
	love_a1.style.background="url(images/icon_all_05.png)";
	love_a2.style.display="none";
}
love_a3.onmouseover=function(){
	love_a3.style.background="url(images/icon_all_09.png)";
}
love_a3.onmouseout=function(){
	love_a3.style.background="url(images/icon_all_10.png)";
}
