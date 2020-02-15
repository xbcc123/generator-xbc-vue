import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Index from '@/pages/index/index'

// 登陆
import login from '@/pages/login/login'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/index',
            component: Index,
            // children: [
            // ]
        }
    ]
})