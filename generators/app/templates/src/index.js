import Vue from 'vue'
import router from './router'
import element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import './styles/index.scss'

import App from './App.vue';

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(element);

new Vue({
    el: '#app',
    data: {
        eventHub: new Vue()
    },
    router,
    components: { App },
    template: '<App/>'
})