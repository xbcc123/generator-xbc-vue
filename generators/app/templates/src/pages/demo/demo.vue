/* eslint-disable no-undef */
<template>
	<section class="ml30 pt30 app">
		<h1 class="f30">
			Hello World!!!
		</h1>
		<h1 class="f20 c9 mt10">
			项目类型: Vue
		</h1>
		<h1 class="f20 c9 mt10">
			应用场景: 后台管理
		</h1>
		<h1 class="f20 c9 mt10">
			UI框架: element/Ant Design of Vue
		</h1>
		<h1 class="f20 c9 mt10">
			状态管理: Vuex
		</h1>
		<h1 class="f20 c9 mt10">
			注意事项:
		</h1>
		<div class="ml20 c9 mt10">
			1. 使用Ant Design of
			Vue时需要删除或者注释feflow中配置的element，和index.html中的theme-chalk2.13.2.css,
			iconfont.css, index.css不然会导致包过大
		</div>
		<div class="ml20 c9 mt10">
			2. 为了开发便利Ant Design of
			Vue没有使用按需加载，如果项目要使用的按需加载请参考官网自行配置
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator"

@Component({
	components: {}
})
export default class Index extends Vue {
	@Prop() readonly propsA!: object

	@Emit()
	test(val) {
		return val
	}

	list: Array<object> = []
	name: string = ""
	number: number = 0
	status: boolean = false

	created() {
		// pont演示
		// let paramsNew: API.post.testCreateUser.Params = {
		// 	gender: "",
		// 	platformList: [],
		// 	username: ""
		// }
		// API.post.testCreateUser.request(paramsNew).then(res => {
		// 	console.log()
		// })
	}
}
</script>

<style scoped lang="scss">
.app {
	line-height: 1.2;
}
</style>
