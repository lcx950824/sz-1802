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


var love_a3=document.getElementById("love_a3")
window.onscroll=function(){
	var t=document.documentElement.scrollTop||document.body.scrollTop;
	if(t>=700){
		love_a3.style.display="block";
	}if(t<700){
		love_a3.style.display="none";
	}
	love_a3.onclick=function(){
		document.documentElement.scrollTop=0
	}	
}
love_a3.onmouseover=function(){
	love_a3.style.background="url(images/icon_all_09.png)";
}
love_a3.onmouseout=function(){
	love_a3.style.background="url(images/icon_all_10.png)";
}



var onum=document.getElementById("num")
var oBox = document.getElementById("box");
var date=getCookie("init")?JSON.parse(getCookie("init")):{};
ajax("get","keke.json",{},function(data) {
	var obj=JSON.parse(data);
	var str="";
	var num=0;
	for(var key in date){				
		for(var i in obj){
			if(key==obj[i].id){
				num++;
				str+=`<li class="myli" date-id=${obj[i].id}>
						<a href="##"  id="mylove"><div class="myle"></div></a>
						<a href="##" class="pic_a1"><img src=${obj[i].img} class="iimg"></a>
						<a href="##" class="word_a1">${obj[i].name}</a>
						<span class="span_1">¥</span><span class="span_2">${obj[i].price}</span><span class="span_3">${obj[i].style}</span>
					</li>`;
			}
		}
	}
	oBox.innerHTML+=str;
	onum.innerHTML=num;
	var myli=document.querySelectorAll(".myli")	
	for (var i = 0; i < myli.length; i++) {			
		myli[i].onmouseover=function(){				
			this.children[0].style.display = "block";
			child=this.children[0];
			child.onclick=function(){
				this.parentNode.remove();
				var b=this.parentNode.getAttribute("date-id");
				for(var key in date){
					if(key==b){
						delete(date[key])
						var k=JSON.stringify(date)
						var newk=k.split(",")						
						onum.innerHTML=newk.length;
						var ostr=JSON.stringify(date)
						setCookie("init",ostr,5)	
					}
				}
									
			}
		}
		myli[i].onmouseout=function(){
			this.children[0].style.display = "none";
		}
	}
	var del=document.getElementById("del")
	del.onclick=function(){
		for (var i = 0; i < myli.length; i++) {
			myli[i].remove();
		}
		onum.innerHTML=0;
		removeCookie("init");			
	}
						
})

