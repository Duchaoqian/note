# 社交软件，交友软件，uniapp前端项目，java后台强调

#### 介绍
基于uni-app和uview写的前端页面，目前适配了小程序和app，欢迎大家二次开发使用,前端采用uniapp+hbuilderX进行开发,支持小程序和app端,已经兼容,前端基本已经完成,目前java后台开发已经开发完毕,后台管理正在研发中，如需要后台代码可以联系我VX：  vip894941971
本人是纯后端，前端水平一般，代码很乱，大家给点耐心看（大神勿喷）！

# 郑重说明
## 本代码开源部分需要删除前端.json文件中的配置就能运行,只是提供学习使用,未全部开源,需要全部源代码的联系微信进行授权,

## 下载即可看见效果,目前后端接口给大家部署在云服务器中,方便大家开发,调试,记得给个一键三连,谢谢

##小程序效果演示,扫码即可
![输入图片说明](https://images.gitee.com/uploads/images/2021/0505/190736_5e8cd79c_7727235.jpeg "gongyou.jpg")


##提交问题

项目代码全部开发完毕，剩下来的工作就是优化代码和后台管理的开发
##关于上线
app目前资质软著还在申请中，小程序已经上线；扫描上方二维码即可,如遇到问题或者关于代码，软件方面，请加微信vip894941971
## 公众号咨询
正在完善部分功能

##功能介绍
功能丰富，小程序体验没有app体验高清效果，App体验更佳高清，如果需要app安装包体验（已经上线）；可以加上方公众号进入，询问安装包
每个页面点击内容和头像以及其他效果都可以自行探索；
## 前端技术
前端采用uniapp+uview+HbuilderX开发;
支持安卓+ios+小程序;
微信登录接口页面预留,需要自己对接;

### 后端代码地址

#### 后端代码地址[后端代码地址](https://gitee.com/lqp9595/gongyou.git)

#### 目前采用技术
jdk1.8  maven3.6 mysql5.7  springboot  springcloud  mybatis-plus等;
腾讯云短信服务,七牛云对象存储服务;



#### 优化更新采用技术
先支持文字聊天,然后最后实现,语音,视频等;
以上技术不变,新增加页面搜索,后台增加elasticsearch,方便首页进行搜索;
整合Oauth2 进行各种第三方授权对接;
对各个平台的cos对象存储服务进行动态切换,多种支持等;
短信服务目前对接腾讯云,后期对接多个平台,支持后台管理中切换;

#### 前端安装运行教程

1.  前端直接运行即可
2.  运行到小程序或者其他端都可以
3.  注意更换api.js文件中自己的地址
4.  manifest.json中小程序的appId更换为自己的id即可

#### 后端安装运行教程

1.  首先启动eureka注册中心
2.  启动gateway网关服务
3.  启动forum论坛圈子服务
4.  ouauth模块暂时不用启动,目前还未整合oauth同意授权认证

注意:数据库地址更换为自己地址
     注册中心和网关本地启动不用更改配置,部署后如果是同一台机器,无需更改,
     服务器不同的话,需要更改对应的地址,方可通信
#### 使用说明

1.  本项目目前全部开源,可正常使用,寡人也正在努力更新
2.  希望你们一键三连,多多支持,才是我的动力
3.  目前还处于开发阶段,部分功能正在加急完善,页面部分图片来自网络,如有侵权,请告知,寡人及时更改;
4.  本人比较喜欢广大交友,一起共同开发,前端最好,本人是属于纯后端的那种,前端不是很会,可以加我VX  vip894941971
5.  也可以进群一起讨论问题,共同开发,合作;

#### 前端页面效果演示
        前端效果全部均已完善,只是在添加部分功能,还有很多页面为上传,如个人详情页,关注页面,消息页面等等;
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160650_63aa2772_7727235.jpeg "d8623985e348a32bffb66bafa0d0d8f.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160709_b5b44883_7727235.jpeg "bb90f77231f313e4925ac493bda7cf8.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160700_531fd652_7727235.jpeg "bf45e56c323e797f796ee6bd7cb6706.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160721_d4744b93_7727235.jpeg "9f6626e70d51fbcf8fec7e477af6d91.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160729_15ad6567_7727235.jpeg "8b801a34aba959c4e718ad41ccaf448.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160739_f3e0626a_7727235.jpeg "9c1e8167c51f1264cf409b9b95cf8e0.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160750_16c89773_7727235.jpeg "3f969e3f728aee1db8a6f3eede40da0.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160758_3a689e64_7727235.jpeg "08e19791f8b426672d7b56128588e60.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160806_7bf4ef4c_7727235.jpeg "8f5487e737c57db54e1c34b462b3735.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160816_52da650b_7727235.jpeg "17c1c9d802b8288925631d7e7358dfa.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160829_0a6108d2_7727235.jpeg "78d98e13d67bb44d3e630db22ba2bc6.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160840_fddfc6e1_7727235.jpeg "769adbf64efef75ec38430c3083c913.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0415/160847_ce9b5c5e_7727235.jpeg "6856a1f35bac0c074820b76f8a57e21.jpg")



