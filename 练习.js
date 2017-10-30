/**
 * Created by Administrator on 2017/10/28.
 */
//1.建立XMLHttpRequest对象
var xmlhttp;
//AjaxDemo
function ajaxFirst() {
    //通过页面内置dom对象来获取对应位置的输入数据
    var input = document.getElementById("intext").value;

    var inpwd = document.getElementById("inpsw").value;
    //针对FireFox，Mozillar，Opera，Safari，IE7，IE8
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        //针对某些特定版本的mozillar浏览器的BUG进行修正
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) { //针对IE6，IE5.5，IE5
        //两个可以用于创建XMLHTTPRequest对象的控件名称
        var activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
        for (var i = 0; i < activexName.length; i++) {
            try {
                //取一个控件名创建，创建成功终止循环
                xmlhttp = new ActiveXObject(activexName[i]);
                break;
            } catch (e) {
                //如果创建失败，回抛出异常然后可以继续循环继续尝试创建 不懂
            }
        }
    }
    //确认XMLHTtpRequest对象创建成功
    if (!xmlhttp) {
        alert("XMLHttpRequest对象创建失败!!");
        return;
    }
    // else {
    //      alert(xmlhttp.readyState);
    // }
    // 2.设置回调函数
    // callback是函数名，该函数将会在步骤5给出定义
    // 函数名后不能加括号，否则就是函数调用
    xmlhttp.onreadystatechange = callback;
    // 3.使用Open方法与服务器建立链接
    // 此行代码接上面设置回调函数
    // 参数1: http的请求方式，支持所有http的请求方式，一般用get或post
    // 参数2: 请求的url地址，get方式请求的参数也在url中
    // 参数3: 采用的交互方式，true表异步

    //xmlhttp.open("Get", "/carrots-admin-ajax/a/login?name=" + input + "&pwd=" + inpwd, true);
    // // 这里只有一个参数，通过get方法从url传输，所以send函数参数设为null
    // xmlhttp.send(null);

    // 4.使用send方法向服务器端发送数据
    //如果使用post方式请求数据，则send函数调用如下
    xmlhttp.open("POST", "/carrots-admin-ajax/a/login", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //post请求方式需要自己设置http请求头RequestHeader
    var text = "name="+ input +"&pwd="+ inpwd;
    xmlhttp.send(text);

    // 5.在回调函数中针对不同响应状态进行处理
    function callback() {
        //判断对象的状态是交互完成
        if (xmlhttp.readyState == 4) {
            //判断http的交互是否成功
            if (xmlhttp.status == 200) {
                //获取服务器端返回的纯文本数据
                var text = JSON.parse(xmlhttp.responseText);
                console.log(text.message);
                //将数据打印到页面上
                var result = document.getElementById("result");
                if(text.code === 0){
                    window.location.href = "Afirst.html";
                }
                if(text.code === -5004){
                    result.innerHTML = "密码错误";
                }
                if(text.code === -5003){
                    result.innerHTML = "用户不存在";
                }
                if(input == "" || inpwd == ""){
                    result.innerHTML = "请输入帐号密码"
                }
                //通过dom的方式找到div标签所对应的元素节点
                //设置元素节点中的html内容
            }
            else {
                alert("报错信息")
            }
        }
    }
}
// String inpwd = request.getParameter("pwd");
// 后台Servlet获取数据代码 //不懂
// 通过url或者send中给定的数据名来获取指定数据