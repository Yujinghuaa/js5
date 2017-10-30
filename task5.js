/**
 * Created by Administrator on 2017/10/29.
 */


var xmlhttp;

function Ajax(){
    var name = document.getElementById("name");
    var password = document.getElementById("password");
    console.log (name.value);
    console.log (password.value);
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        // IE6, IE5 浏览器执行代码
    }

    xmlhttp.onreadystatechange = callback;
    xmlhttp.open("POST", "/carrots-admin-ajax/a/login", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var text = "name="+ name.value +"&pwd="+ password.value;
    //xmlhttp.send("name="+name.value+"&pwd="+password.value)
    xmlhttp.send(text);
    function callback(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            var text =JSON.parse(xmlhttp.responseText);
            console.log(text);
            if(text.code == 0){
                alert("success")
            }
            else{
                alert("输入错误")
            }
        }
    }
}



