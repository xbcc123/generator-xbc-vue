import Vue from 'vue';
import Router from 'vue-router';

//首页框架（包含菜单）
const Demo = () => import('@/pages/demo/demo');
const noFound = () => import('@/pages/noFound/404');

Vue.use(Router);

let routes = [
	{
		path: '/',
		redirect: '/demo'
	},
	{
		path: '/demo',
		component: Demo,
		children: [
			//     {
			//     path: '/',
			//     component: productView
			// },
		]
	},
	{
		path: '*',
		component: noFound, // 标准单审批
	},
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
