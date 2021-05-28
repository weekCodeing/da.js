# WXAPP
最近微信小程序比较火，正好昨天弄到了破解版[微信web开发工具](https://github.com/gavinkwoe/weapp-ide-crack)，所以今天正好试试手。由于我是做ios的，所以对H5和CSS方面不太了解，代码里面写的丑的地方欢迎吐槽。

##1.效果演示  
![](https://github.com/Eastwu5788/WXAPP/raw/master/images/WXEXE.gif)  

##2.微信小程序介绍    
微信小程序的一个页面主要分成三个部分.js文件.wxml文件和.wxss文件   
+ . js文件
.js文件相当于ios中的一个控制器，所有的业务逻辑操作都放在该文件中完成，xml页面中显示的数据都从该文件中传入。  
+ .wxml文件
.wxml文件用于写HTML5代码，也就是用来页面布局。
+ .wxss文件  
.wxss文件则是用来处理所有的css样式信息  

##3.代码介绍    
页面布局代码，由于开发工具的所有接口访问有限制，所以数据都写在了本地，但是最新的破解版开发工具已经处理的这个问题，我也会尽快将死数据改成网络请求下来的数据   
```  
 <view class = "index">
    <view class = "header-container" >
    <!-- 轮播图  -->
    <swiper class = "header-swiper" autoplay="true" scroll-x="true" interval="3000" duration="1000">
      <block wx:for-items="{{ adimages }}">
        <swiper-item>
          <image class = "header-swiper-img" src="{{ item.img_url }}" mode="aspectFill" ></image>
        </swiper-item>
      </block>
    </swiper> 
    
    <image class = "header-search-img" src="../../images/icon_sshome.png"></image>
    
    </view>

    <!-- 首页推荐 -->
    <view class = "scroll-container"> 
        <block wx:for="{{ result }}" wx:for-index='index' wx:for-item='item'>
          <!-- 竖向分割线 -->
          <view class = "home-view-sep-ver" style = "float:left"></view>
          
          <!-- 主视图 -->
          <view class = "scroll-view" style = "float:left; flex-direction:row; justify-content: space-around;">
              <image class = "header-cover-img" src = "{{ item.cover }}" mode = "aspectFill"/>
              <view class = "home-text-nickname" style = "float:left"> {{ item.nickname }} </view>
              <view class = "home-text-city" style = "float:left"> {{ item.city_name }} </view>
          </view>
          
          <!-- 横向分割线 -->
          <view wx:if = "{{ (index + 1) % 2 == 0 && index != 0}}" class = "home-view-sep-hor" style = "display: inline-block;"></view>
    
        </block>
    </view>

    <!-- 邀请好友模块 -->
    <view class = "home-invite-container">
      <view class = "home-invite-title" > {{ invite.title }} </view>
      <image class = "home-invite-cover" src = "{{ invite.img_url }}" mode = "aspectFill" />
      <view class = "home-invite-content" style = "display: inline-block;" > {{ invite.content }} </view>
      <view class = "home-invite-subcontent"  style = "display: inline-block;"> {{ invite.subcontent }} </view>
    </view>

    <!-- 首页鲜肉 -->
    <view class = "scroll-container"> 
        <block wx:for="{{ recommends }}" wx:for-index='index' wx:for-item='item'>
          <!-- 竖向分割线 -->
          <view class = "home-view-sep-ver" style = "float:left"></view>
          
          <!-- 主视图 -->
          <view class = "scroll-view" style = "float:left; flex-direction:row; justify-content: space-around;">
              <image class = "header-cover-img" src = "{{ item.cover }}" mode = "aspectFill"/>
              <view class = "home-text-nickname" style = "float:left"> {{ item.nickname }} </view>
              <view class = "home-text-city" style = "float:left"> {{ item.city_name }} </view>
          </view>
          
          <!-- 横向分割线 -->
          <view wx:if = "{{ (index + 1) % 2 == 0 && index != 0}}" class = "home-view-sep-hor" style = "display: inline-block;"></view>
    
        </block>
    </view>
</view>
```   
欢迎大家关注我的微信公众号    
![](https://github.com/Eastwu5788/WXAPP/raw/master/images/wechat.jpg)
