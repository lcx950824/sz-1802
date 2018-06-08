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

var cent = document.getElementById("cent_1");
var date=getCookie("init")?JSON.parse(getCookie("init")):{};
ajax("get","keke.json",{},function(data) {
	var obj=JSON.parse(data);
	var str="";
	var num=0;
	for(var key in date){				
		for(var i in obj){
			if(key==obj[i].id){
				num++;
				str+=`<div id="box">
						<img src=${obj[i].img}>
						<div id="filter"></div>
					</div>
					<div id="max">
						<img src=${obj[i].img} id="maximg">
					</div>
					<div id="part">
						<h2>${obj[i].name}</h2>
						<span class="spa_1">${obj[i].part}</span>
						<div id="price">
							<span>¥</span><span id="pri">${obj[i].price}</span>	
						</div>
					</div>`;
			}
		}
	}
	cent.innerHTML+=str;
	var max=document.getElementById("max")
	var omaxImg = document.getElementById("maximg");
	var oFilter = document.getElementById("filter");
	var oBox = document.getElementById("box");
	oBox.onmouseover = function(){
		oFilter.style.display = "block";
		max.style.display = "block";
		this.onmousemove = function(e){
			var e = e||event;
			var l = e.pageX - oBox.offsetLeft - oFilter.offsetWidth/2;
			var t = e.pageY - oBox.offsetTop - oFilter.offsetHeight/2;
			l = l>oBox.offsetWidth - oFilter.offsetWidth?oBox.offsetWidth - oFilter.offsetWidth:(l<0?0:l);
			t = t>oBox.offsetHeight - oFilter.offsetHeight?oBox.offsetHeight - oFilter.offsetHeight:(t<0?0:t);
			oFilter.style.left = l+'px';
			oFilter.style.top = t+'px';
			omaxImg.style.left = -2*l+'px';
			omaxImg.style.top = -2*t+'px';

		}
	}
	oBox.onmouseout=function(){
		oFilter.style.display = "none";
		max.style.display = "none";
	}
})
