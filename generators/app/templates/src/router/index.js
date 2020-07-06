import Vue from 'vue';
import Router from 'vue-router';

//首页框架（包含菜单）
const Index = () => import('@/pages/index/index');

Vue.use(Router);

let routes = [
	{
		path: '/',
		redirect: '/index'
	},
	// {
	// 	path: '/login',
	// 	component: login
	// },
	{
		path: '/Index',
		component: Index,
		children: [
			//     {
			//     path: '/',
			//     component: productView
			// },
		]
	},
	// {
	// 	path: '/orderDetailPhone',
	// 	component: orderDetailPhone, // 标准单审批
	// 	meta: {
	// 		keepAlive: true
	// 	}
	// },
];

// 配置引入路由
let routerChildObj = {
	// orderMana
};

const mergeRouter = (routes, obj) => {
	for (const key in obj) {
		routes[2].children = routes[2].children.concat(obj[key]);
	}
	return routes;
};

routes = mergeRouter(routes, routerChildObj);

export default new Router({
	routes
});
