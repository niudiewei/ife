'use strict';
function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}
window.onload = function(){
    var oBox = document.getElementById('box');
    var oUl = oBox.children[1];
    var oTxt = document.getElementById('txt');
    var oBtn = document.getElementById('btn');
    var moveFlag = false;
    var c = 10;
    var r = 10;
    var w = 50,h = 50;
    var left = 0;
    var top = 0;
    var rotate = 0;
    var count = 0;
    var arr = [];
    var commond = ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC', 'TRA LEF', 'TRA RIG', 'TRA TOP', 'TRA BOT', 'MOV LEF', 'MOV RIG', 'MOV TOP', 'MOV BOT'];
    for(var i=0;i<c*r;i++){
        var oLi = document.createElement('li');
        oUl.appendChild(oLi);
        // oLi.innerHTML = oLi.offsetLeft+', '+oLi.offsetTop;
    }
    // 画小方块
    var oBlock = document.createElement('span');
    oBox.appendChild(oBlock);
    oBlock.className = 'block';
    left = rnd(0,r)*w;
    top = rnd(0,c)*h;
    oBlock.style.left = left+'px';
    oBlock.style.top = top+'px';

    oBtn.onclick = function(){
        arr = [];
        var sValue = oTxt.value.toUpperCase();
        arr = sValue.split('\n');
        var reg = new RegExp(commond,'g');
        console.log(reg);
        // 检测
        for(var i=0;i<arr.length;i++){
            if(!reg.test(arr[i])){
                alert('输入有误');
                return;
            }
        }

        console.log(arr);
        startMove(arr);
    };
    oBlock.addEventListener('transitionend',function(){
        moveFlag = false;
        count ++;
        if(count == arr.length){
            count = 0;
            return;
        }
        startMove(arr);
    },false);
    //操作
    function startMove(arr){
        if(moveFlag)return;
        moveFlag = true;
        // 拆分命令
        var sValue = arr[count];

        if(sValue == 'GO'){
            var dir = getDir(rotate);
            switch(dir){
                case 0:
                    top -= 50;
                    break;
                case 1:
                    left += 50;
                    break;
                case 2:
                    top += 50;
                    break;
                case 3:
                    left -= 50;
                    break;
            }
            go();
        }
        if(sValue.indexOf('TUN') != -1){
            // 掉头
            switch(sValue){
                case 'TUN LEF':
                    rotate -= 90;
                    break;
                case 'TUN RIG':
                    rotate += 90;
                    break;
                case 'TUN BAC':
                    rotate -= 180;
                    break;
            }
            oBlock.style.WebkitTransform = 'rotate('+rotate+'deg)';
        }
        if(sValue.indexOf('TRA') != -1){
            // 平移
            switch(sValue){
                case 'TRA LEF':
                    left -= w;
                    break;
                case 'TRA TOP':
                    top -= h;
                    break;
                case 'TRA RIG':
                    left += w;
                    break;
                case 'TRA BOT':
                    top += h;
                    break;
            }
            go();
        }

        if(sValue.indexOf('MOV') != -1){
            // 转弯并直行
            var dir = getDir(rotate);
            //after work
            switch(sValue){
                case 'MOV LEF':
                    if(dir == 0)rotate -= 90;
                    if(dir == 2)rotate += 90;
                    if(dir == 1)rotate += 180;
                    left -= w;
                    break;
                case 'MOV TOP':
                    if(dir == 1)rotate -= 90;
                    if(dir == 2)rotate += 180;
                    if(dir == 3)rotate += 90;
                    top -= h;
                    break;
                case 'MOV RIG':
                    if(dir == 0)rotate += 90;
                    if(dir == 2)rotate -= 90;
                    if(dir == 3)rotate += 180;
                    left += w;
                    break;
                case 'MOV BOT':
                    if(dir == 0)rotate+= 180;
                    if(dir == 1)rotate += 90;
                    if(dir == 3)rotate -= 90;
                    top += h;
                    break;
            }
            oBlock.style.WebkitTransform = 'rotate('+rotate+'deg)';
            go();
        }
        function go(){
            if(top <= 0)top = 0;
            if(top >= w*(c-1))top = w*(c-1);
            if(left <= 0)left = 0;
            if(left >= h*(r-1))left = w*(c-1);
            oBlock.style.left = left+'px';
            oBlock.style.top = top+'px';
        }
        function getDir(rotate){
            var dir = (rotate/90)%4;
            if(dir == -3)dir = 1;
            if(dir == -2)dir = 2;
            if(dir == -1)dir = 3;
            return dir;
        }
    };



    // textarea
    var lines = document.getElementById('divlines');
    refreshlines();
    oTxt.onscroll = function() {
        lines.style.top = -(oTxt.scrollTop) + 'px';
        return true;
    }
    oTxt.onkeyup = function() {
        refreshlines();
        return true;
    }

    function refreshlines() {
        var nLines = oTxt.value.split('\n').length;
        lines.innerHTML = ''
        for (i = 1; i <= nLines; i++) {
            lines.innerHTML = lines.innerHTML + i + '<br />';
        }
        lines.style.top = -(oTxt.scrollTop) + 'px';
    }

    function findInArr(arr,num){
    	for(var i=0;i<arr.length;i++){
    		if(arr[i]==num){
    			return true;
    		}
    	}
    	return false;
    }
};
