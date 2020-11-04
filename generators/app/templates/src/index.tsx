import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// 如果使用element 删除它
import Antd from "ant-design-vue"
Vue.use(Antd)

const isDebug_mode = process.env.NODE_ENV !== "production"
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

new Vue({
	el: "#app",
	data: {
		eventHub: new Vue()
	},
	router,
	store,
	components: {
		App
	},
	template: "<App/>"
})
