# 说明
由于本项目包含多个小的demo演示，所以在src文件夹里面又建立了多个子文件夹，一个子文件夹对应一个独立的demo小项目，所以结构和默认的项目结构有点不同。  
在main.js里面设置加载哪个demo子项目

# 环境
Vue3.0  
VueRouter 4.0  
* 最新稳定版
$ npm install vue@next

* 安装 
npm install -g @vue/cli@next

ant Design Vue2.x
* 安装 
$ npm install ant-design-vue --save


# main.js 加载子项目的方法
通过比较笨的注释的方式，注释掉不需要运行的demo，只保留一个想要运行的demo

# 路由demo

## script 的方式引入VueRouter
* /src/router-script  
直接采用script的方式引入js 文件的方式使用路由的demo。

## 路由尝试
* /src/router-test   
里面是一些一开始的各种尝试。可以忽略，这里只是留个纪念

## 用户中心的路由 
* /src/router-userCenter  
使用用户中心的通用设置，验证路由的各种使用方式
 

## 仿某乎的路由 
* /src/router-zhihu  
仿某乎的路由，仿制一套路由设置  

* 路由设置讲解：
https://gitbook.cn/books/5fbc63d2ba97546ed36c7fa6/index.html 

* 视频演示：  
基础路由 https://www.zhihu.com/zvideo/1314326340745904128  
动态添加路由：https://www.zhihu.com/zvideo/1314336090048843776 

# CND的dmeo

## 个人博客
Vue 3.0 入门之实战篇，先写个博客练练手
https://gitbook.cn/gitchat/activity/5f7fd08d86b3d00f37ea4c5e 

 