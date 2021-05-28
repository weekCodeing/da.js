<?php
$appid = '你的appid';
$sessionKey = '你的appsecret';
$templateid = '你的模板id';
//获取客户端输入内容
$code=$_GET['code'];
$FORMID=$_GET['FORMID'];
$datebegin=$_GET['datebegin'];
$dateend=$_GET['dateend'];
$no=$_GET['no'];
$name=$_GET['name'];
$tel=$_GET['tel'];
//获取openid
$url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$sessionKey}&js_code={$code}&grant_type=authorization_code";
$resp=file_get_contents($url);
$robot=json_decode($resp);
$openid = $robot->openid;

//获取token
$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$sessionKey}";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);//无需https校验
$a = curl_exec($ch);
$strjson=json_decode($a);
$token = $strjson->access_token;

//构造模板内容
$k1=array("value"=>"机电","color"=>"#224466");
$k2=array("value"=>$datebegin,"color"=>"#173177");
$k3=array("value"=>$dateend,"color"=>"#173177");
$k4=array("value"=>$name,"color"=>"#173177");
$k5=array("value"=>$tel,"color"=>"#173177");
$key=array("keyword1"=>$k1,"keyword2"=>$k2,"keyword3"=>$k3,"keyword4"=>$k4,"keyword5"=>$k5);
$a=array("touser"=>$openid,"template_id"=>$templateid,"form_id"=>$FORMID,"data"=>$key,"emphasis_keyword"=>"keyword1.DATA");
$post=json_encode($a);
//发送模板消息
$url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$token}";  
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);//url  
curl_setopt($ch, CURLOPT_POST, 1);  //post
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);  
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_exec($ch); 
curl_close($ch); 
?>