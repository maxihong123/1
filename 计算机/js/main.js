var btn_wrap = document.getElementsByClassName('c_btn_wrapper')[0], 
    content = document.getElementsByTagName('p')[0], 
    count = 0, 
    bOneDec = false;
btn_wrap.onclick = function(e){
    var target = e.target;
    if(target.nodeName.toLowerCase() === 'button'){
        var btnType = target.innerText;
        if(content.innerText == 'Math Error' && btnType != 'C'){
            return;
        }
        if(btnType == 'C'){
            bOneDec = false;
            content.innerText = '0';
            count = 1;
        }else if(btnType == 'Del'){
            if(content.innerText != ''){
                if(content.innerText.length === 1){
                    content.innerText = '0';
                }else{
                    content.innerText = content.innerText.slice(0,-1);
                }
                count--;
            }
        }else if(btnType == '='){
            var text = content.innerText;
            if(!text){
                return;
            }else{
                text = text.replace(/x/g,'*');
                var result;
                try{
                    result = eval(text) + '';
                    if(result.search(/\./) > 0){
                        bOneDec = true;
                        if(result.split('.')[1].length > 5){
                            result = (+result).toFixed(5);
                        }
                    }
                    content.innerText = result;
                    count = result.length;
                }catch(e){
                    content.innerText = 'Math Error';
                }
            }
        }else{
            if(isNaN(+btnType) && btnType != '.'){
                bOneDec = false;
            }
            if(btnType == '.'){
                if(bOneDec){
                    return;
                }
                bOneDec = true;
            }
            if(content.innerText == '0' && (!isNaN(+btnType) ||
            btnType == '(' || btnType == ')')){
                content.innerText = '';
            }
            content.innerText += btnType;
            if(count++ >= 44){
                alert('输入的字符过多');
            }
        }   
    }
}
