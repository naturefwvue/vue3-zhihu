import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 一开始的路由尝试
import App from './router-test/App.vue'
import router from './router-test/router'
import store from './router-test/store'

// 用户中心的路由演示
// import App from './router-userCenter/App.vue'
// import router from './router-userCenter/router'
// import store from './router-userCenter/store'

// 仿某乎的路由演示
// import App from './router-zhihu/App.vue'
// import router from './router-zhihu/router'
// import store from './router-zhihu/store'

createApp(App).use(Antd).use(store).use(router).mount('#app')
