<template>
	<div class="index">
		<div class="headerWrapper">
			<div class="headerLeft">
				<span class="title">云百泰服务中台</span>
				<a-menu
					:default-active="menuIndex"
					class="a-menu-demo"
					mode="horizontal"
					style
					@select="handleSelect"
				>
					<a-menu-item
						v-for="item in menusMenu"
						:key="item.id + ''"
						:index="Number(item.id)"
					>
						<span>{{ item.menuName }}</span>
					</a-menu-item>
					<a-dropdown v-if="isProprietary">
						<span class="a-dropdown-link cursor"> 自营系统 </span>
						<a-menu slot="overlay">
							<a-menu-item
								v-for="(proprietary,
								proprietaryIndex) in proprietaryList"
								:key="'proprietary' + proprietary.app"
								:index="proprietaryIndex"
								@click="handleProprietaryClick(proprietary.app)"
							>
								{{ proprietary.appName }}
							</a-menu-item>
						</a-menu>
					</a-dropdown>
				</a-menu>
			</div>
			<div class="headerRight">
				<!-- 当前金价  -->
				<span class="accoutName" @click="editUser"
					>欢迎你，{{ accountData.concat }}</span
				>
				<i class="a-icon-menu" @click="loginOut"></i>
				<a-modal
					title="个人资料"
					:visible.sync="editDialogTF"
					:closable="false"
					width="780px"
					:close-on-click-modal="false"
				>
					<div class="editUserDiv">
						<a-row>
							<a-col :span="4" class="editUserLeft">
								用户名称
							</a-col>
							<a-col :span="20" class="editUserRight">
								{{ accountData.username }}&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft">
								用户姓名
							</a-col>
							<a-col :span="20" class="editUserRight">
								{{ accountData.concat }}&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft">
								用户状态
							</a-col>
							<a-col :span="20" class="editUserRight">
								<span v-if="accountData.statu == 'E'"
									>已启用</span
								>
								<span v-else-if="accountData.statu == 'D'"
									>已禁用</span
								>
								&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft">
								密码设置
							</a-col>
							<a-col :span="20" class="editUserRight">
								<span v-if="!editUserState">******</span>
								<span v-else>
									<a-input
										v-model="accountData.oldPassword"
										type="password"
										placeholder="请输入原始密码"
										class="userInp mb10"
										:maxlength="16"
									></a-input>
									<a-input
										ref="password"
										v-model="accountData.password"
										type="password"
										placeholder="请输入新密码"
										class="userInp mb10"
										:maxlength="16"
									></a-input>
									<a-input
										v-model="accountData.passwordTwo"
										type="password"
										placeholder="再输入一遍新密码"
										class="userInp"
										:maxlength="16"
									></a-input>
								</span>
								&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft mt10">
								联系电话
							</a-col>
							<a-col :span="20" class="editUserRight">
								<span v-if="!editUserState">{{
									accountData.telephone
								}}</span>
								<span v-else>
									<a-input
										v-model="accountData.telephone"
										placeholder="请输入联系电话"
										class="userInp mb10 mt10"
									></a-input>
								</span>
								&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft">
								邮箱地址
							</a-col>
							<a-col :span="20" class="editUserRight">
								<span v-if="!editUserState">{{
									accountData.mail
								}}</span>
								<span v-else>
									<a-input
										v-model="accountData.mail"
										placeholder="请输入邮箱地址"
										class="userInp"
									></a-input>
								</span>
								&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft">
								所属角色
							</a-col>
							<a-col :span="20" class="editUserRight">
								{{ accountData.roleName }}&nbsp;
							</a-col>
							<a-col :span="4" class="editUserLeft">
								所属部门
							</a-col>
							<a-col :span="20" class="editUserRight">
								{{ accountData.deptName }}&nbsp;
							</a-col>
						</a-row>
					</div>
					<span slot="footer" class="dialog-footer">
						<a-button
							v-if="!editUserState"
							type="primary"
							size="small"
							@click="editUserFun"
							>修 改</a-button
						>
						<a-button
							v-if="editUserState"
							size="small"
							@click="editDialogTF = false"
							>取 消</a-button
						>
						<a-button
							v-if="editUserState"
							type="primary"
							size="small"
							:loading="btnLoading"
							@click="saveUser"
							>保 存</a-button
						>
					</span>
				</a-modal>
			</div>
		</div>
		<div class="buttomWrapper">
			<div class="leftWrapper">
				<a-menu
					:router="true"
					:default-selected-keys="['1']"
					mode="inline"
					@select="subMenuSelect"
				>
					<template v-for="item in subMenuData">
						<!-- 如果有子菜单 -->
						<a-sub-menu
							v-if="item.childs.length > 0"
							:key="item.id"
						>
							<template slot="title">
								<span :style="{ paddingLeft: '14px' }">
									{{ item.menuName }}
								</span>
							</template>
							<a-menu-item
								v-for="itemSubs in item.childs"
								:key="itemSubs.id"
							>
								<div>{{ itemSubs.menuName }}</div>
							</a-menu-item>
						</a-sub-menu>
						<!-- 如果没有子菜单 -->
						<a-menu-item
							v-else
							:key="item.id"
							:style="{ paddingLeft: '35px' }"
						>
							<span>
								{{ item.menuName }}
							</span>
						</a-menu-item>
					</template>
				</a-menu>
			</div>
			<div class="rightWrapper">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import _ from "lodash"
import { menu } from "./menuConfig"
import app from "@/global"

export default {
	data() {
		return {
			newMenuData: [],
			btnLoading: false,
			goldpriceData: [], //当前金价数据
			showGold: false, //金价显示
			menuData: {}, //目录保录浏览器缓存
			isProprietary: false, // 自营菜单
			proprietaryList: [], // 自营菜单
			menuIndex: "4",
			defaultIndex: "", //二级目录下默认打开第一个子目录
			codeImgUrl: "",
			menus: {
				menu: _.cloneDeep(menu),
			},
			subMenuData: [], //左边菜单数据
			accountName: "系统用户",
			accountData: {}, //当前用户
			editDialogTF: false, //编辑用户弹出框属性
			editUserState: false, //编辑用户状态（false为查看状态，true为编辑状态）
		}
	},

	computed: {
		menusMenu: function () {
			return this.menus.menu
				.filter((item) => item.showTF)
				.filter((item) => item.menuName !== "自营系统")
		},
	},

	created() {
		this.getMenus()
		this.getBaseInfo()
		this.getProprietary()
	},

	methods: {
		/**
		 * @description:
		 * @param {Object} proprietary 选中的自营系统
		 * @return {*}
		 */
		handleProprietaryClick(proprietary) {
			console.log(proprietary)
			this.getRefreshToken(proprietary).then((res) => {
				this.goProprietart(res.data)
			})
		},

		//获取用户基本信息
		getBaseInfo() {
			app.$api.myinfo().then((res) => {
				if (res.data.code == 200) {
					this.accountData = res.data.data
					localStorage.sjyUserId = this.accountData.userId
					localStorage.sjyUserName = this.accountData.username
				}
			})
			localStorage.getItem("accountName")
				? (this.accountName = localStorage.getItem("accountName"))
				: (this.accountName = "暂无")
		},

		// 获取自营系统
		getProprietary() {
			app.$api.getAddressableApp().then((res) => {
				this.proprietaryList = res.data
			})
		},

		//修改当前用户按钮
		editUser() {
			this.editUserState = false
			this.editDialogTF = true
		},

		//编辑用户信息
		editUserFun() {

			this.$confirm({
				title: '提示',
				content: "确认修改当前用户？",
				onOk: () => {
					this.editUserState = true
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		},

		//修改当前用户信息保存按钮
		saveUser() {
			//密码校验
			if (this.accountData.password != undefined) {
				// 检测密码是否重复。
				const { password, oldPassword } = this.accountData

				if (password === oldPassword) {
					this.$message.error("新密码不能与旧密码相同，请重新输入。")
					this.accountData.password = this.accountData.passwordTwo = ""
					this.$refs.password.focus()
					return
				}
				if (this.accountData.oldPassword == undefined) {
					this.accountData.oldPassword = ""
				}
				if (this.accountData.password != this.accountData.passwordTwo) {
					this.$message.error("两个新密码输入不相同，请重新输入！")
					return
				}
				if (
					!this.$v.verifyPassword(this.accountData.password) ||
					!this.$v.verifyPassword(this.accountData.oldPassword)
				) {
					this.$message.error("密码长度为6-16位，大小写字母/数字，请重新输入！")
					return
				}
			}
			this.btnLoading = true
			app.$api.updateInfo(this.accountData).then((res) => {
				if (res.data.code == 200) {
					this.$message.success("用户密码和信息修改成功，正在重新登录！")
					setTimeout(function () {
						this.btnLoading = false
						this.$router.push("/login")
					}, 1000)
				}
			})
		},

		//退出登录
		loginOut() {
			let params = {
				PRS: {
					accessToken: localStorage.accessToken,
				},
			}
			this.$confirm("确认退出登录？", "提示", {
				type: "warning",
			}).then(() => {
				this.$router.push("/login")
				app.$api
					.logout(params)
					.then((res) => {
						if (res.data.code == 200) {
							localStorage.clear()
							this.setCookie("heheToken", "")
						}
					})
					.catch(function () {})
			})
		},

		getCookie(c_name) {
			if (document.cookie.length > 0) {
				if (document.cookie.split("; ").length > 0) {
					let tempObj = {}
					document.cookie.split("; ").forEach((ielem) => {
						tempObj[ielem.split("=")[0]] = ielem.split("=")[1]
					})
					if (tempObj[c_name]) {
						return tempObj[c_name]
					} else {
						return ""
					}
				} else {
					return ""
				}
			}
		},

		// 跳转自营系统
		// eg: http://192.168.16.19:9390?refreshToken=3967dde0a71d41969005d86440864ea9&route=/app/company/main
		goProprietart({ origin, refreshToken }) {
			// origin= 'http://localhost:8275'
			let url = `${origin}/#/index?refreshToken=${refreshToken}&route=`
			window.open(`${url}`)
		},

		/**
		 * 获取refreshToken
		 * @param {type} targetAppName 自营系统标识
		 * @param {type} route 需要跳转的路由
		 */
		getRefreshToken(targetAppName, route = "") {
			let params = {
				targetAppName,
				route,
			}
			return new Promise((reslove, reject) => {
				app.$api
					.getRedirectionUrl(params)
					.then((res) => {
						reslove(res)
					})
					.catch((err) => {
						reject(err)
					})
			})
		},

		//一级菜单选择
		handleSelect(options) {
			const { key } = options
			this.menuIndex = key
			let { currentMenuUrl, subMenuData } = this.getOneMenu()
			this.subMenuData = subMenuData
			this.$router.push(currentMenuUrl)
			this.defaultIndex = currentMenuUrl
			localStorage.pathData = currentMenuUrl
		},

		// 获取选中菜单的信息
		getOneMenu() {
			let currentMenuUrl = "",
				subMenuData = ""
			this.menus.menu.forEach((item) => {
				console.log(Number(item.id), Number(this.menuIndex))
				if (Number(item.id) !== Number(this.menuIndex)) {
					return
				}
				subMenuData = item.childs
				let fistMenu = item.childs[0]
				if (fistMenu.menuUrl) {
					currentMenuUrl = fistMenu.menuUrl
				} else {
					// 如果只设置了目录 没有设置菜单 则默认到index
					let secondMenu = fistMenu.childs[0] || {
						menuUrl: "/indexAnt",
					}
					currentMenuUrl = secondMenu.menuUrl
				}
			})
			return {
				subMenuData,
				currentMenuUrl,
			}
		},

		//二级菜单选择
		subMenuSelect(key) {
			let currentMenuUrl = ""
			this.menus.menu.forEach((ielem) => {
				if (ielem.childs) {
					ielem.childs.forEach((item) => {
						if (item.menuUrl === key) {
							this.defaultIndex = item.menuUrl
							currentMenuUrl = item.menuUrl
						}
						if (item.childs) {
							item.childs.forEach((Kelem) => {
								if (Kelem.menuUrl === key) {
									this.defaultIndex = Kelem.menuUrl
									currentMenuUrl = Kelem.menuUrl
								}
							})
						}
					})
				}
			})
			localStorage.pathData = currentMenuUrl
		},

		// 给菜单上面权限点showTF赋值 当菜单权限匹配到权限点时候为true
		getNewMenus(authList, menusList) {
			menusList.forEach((oneMenuItem) => {
				// 一级菜单权限设置
				oneMenuItem.showTF = authList.includes(oneMenuItem.auth)
				oneMenuItem.childs.forEach((twoMenuItem) => {
					// 二级菜单权限设置
					twoMenuItem.showTF = authList.includes(twoMenuItem.auth)
					twoMenuItem.childs.forEach((threeMenuItem) => {
						// 三级级菜单权限设置
						threeMenuItem.showTF = authList.includes(threeMenuItem.auth)
						// 四级级菜单权限设置
						threeMenuItem.childs.forEach((fourMenuItem) => {
							fourMenuItem.showTF = authList.includes(fourMenuItem.auth)
						})
					})
				})
			})
			return menusList
		},

		// 删除为showTF为 false的菜单
		getAuthTrueMenus(oldMenuData) {
			oldMenuData.forEach((kelem) => {
				if (kelem.showTF) {
					let newSubMenuList = []
					kelem.childs.forEach((qelem) => {
						//二級遍历
						if (qelem.showTF) {
							newSubMenuList.push(qelem)
							if (qelem.childs.length != 0) {
								let newThreeMenuList = []
								qelem.childs.forEach((pelem) => {
									if (pelem.showTF) {
										newThreeMenuList.push(pelem)
									}
								})
								qelem.childs = newThreeMenuList
							}
						}
					})
					kelem.childs = newSubMenuList
				}
			})
			return oldMenuData.filter((item) => item.showTF)
		},

		//菜单数据读取
		getMenus() {
			app.$api.queryVerify().then((res) => {
				let authList = res.data,
					newMenus = []
				sessionStorage.setItem("verify", JSON.stringify(authList))
				newMenus = this.getNewMenus(authList, this.menus.menu)
				newMenus = this.getAuthTrueMenus(newMenus)
				this.newMenuData = newMenus.filter((item) => item.showTF)
				this.menus.menu = this.newMenuData
				this.isProprietary = newMenus.some(
					(item) => item.menuName === "自营系统"
				)
				if (localStorage.pathData) {
					this.goNext(this)
				} else {
					this.goFirstNext(this)
				}
			})
		},

		// 没有缓存路径
		goFirstNext(this) {
			let id = this.menus.menu[0].id
			this.handleSelect({key: id})
		},

		// 有缓存路径
		goNext(this) {
			let currentMenuUrl = ""
			let {
				rootItem,
				rootItem: { id },
				nextItem,
				threeItem,
			} = this.getCurrentMenu(localStorage.pathData, this)
			if (threeItem) {
				currentMenuUrl = threeItem.menuUrl
			} else {
				currentMenuUrl = nextItem.menuUrl
			}
			this.menuIndex = id
			this.subMenuData = rootItem.childs

			// 如果当前是二级或者三级菜单则根据缓存菜单跳转页面 否者不跳转页面
			if (this.$route.path === currentMenuUrl) {
				this.$router.push(currentMenuUrl)
			}
			this.defaultIndex = currentMenuUrl
		},

		// 通过路径获取选中菜单信息
		getCurrentMenu(key) {
			let rootItem = "",
				nextItem = "",
				threeItem = ""
			this.menus.menu.forEach((ielem) => {
				if (ielem.childs) {
					ielem.childs.forEach((item) => {
						if (item.menuUrl === key) {
							rootItem = ielem
							nextItem = item
						}
						if (item.childs) {
							item.childs.forEach((Kelem) => {
								if (Kelem.menuUrl === key) {
									rootItem = ielem
									nextItem = item
									threeItem = Kelem
								}
							})
						}
					})
				}
			})
			return {
				rootItem,
				nextItem,
				threeItem,
			}
		},

		// 转换验证列表
		conversionAuthList(authList, oldMenuData) {
			authList.forEach((ielem) => {
				if (ielem.hasAuth == "true") {
					oldMenuData.forEach((qelem) => {
						if (ielem.auth === qelem.auth) {
							qelem.showTF = true
						}
						//一级菜单目录遍历
						qelem.childs.forEach((kelem) => {
							//二级菜单目录遍历
							if (!kelem.auth) {
								kelem.childs.forEach((welem) => {
									//三级菜单目录遍历
									for (var i = 0; i < welem.auth.split(",").length; i++) {
										if (welem.auth.split(",")[i] == ielem.auth) {
											welem.showTF = true
											kelem.showTF = true
											qelem.showTF = true
										}
									}
								})
							} else {
								for (var i = 0; i < kelem.auth.split(",").length; i++) {
									if (kelem.auth.split(",")[i] == ielem.auth) {
										kelem.showTF = true
										qelem.showTF = true
									}
								}
							}
						})
					})
				}
			})
			return authList
		},

		setCookie(c_name, value) {
			document.cookie =
				c_name + "=" + escape(value) + ";path=/;domain=localhost"
		},

		//微信二维码扫码
		codeLoad() {
			app.$api.getQrcode().then((res) => {
				if (res.data.code == 200) {
					this.codeImgUrl = res.data.data
				}
			})
		},
	},
}
</script>
<style>
.a-badge__content.is-fixed {
	right: -46px !important;
	top: 30px !important;
	width: 12px;
	height: 16px;
}
</style>
<style scoped lang="scss">
body {
	background-color: #f3f3f3;
}

.index {
	overflow: hidden;

	.title {
		background-color: rgb(230, 14, 50);
		color: #ffffff;
		width: 195px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
	}

	.headerWrapper {
		background: #ffffff;
		box-shadow: 0 1px 5px #ebebeb;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.headerLeft {
			color: rgb(230, 14, 50);
			margin-left: 0px;
			height: 100%;
			display: flex;
			align-items: center;
		}

		.headerRight {
			color: #2d2f33;
			margin-right: 25px;
			display: flex;
			align-items: center;
			font-size: 0.6rem;
			.accoutName {
				margin: 0 12px 0 5px;
				font-size: 14px;
				cursor: pointer;
			}
		}
	}

	.a-menu-demo {
		height: 50px;

		li {
			height: 50px;
			line-height: 50px;
		}

		/deep/ .a-sub-menu__title {
			height: 50px;
			line-height: 54px;
		}
	}

	.buttomWrapper {
		display: flex;

		.leftWrapper {
			width: 200px;
			box-shadow: 1px 0 5px #ebebeb;
			background: #ffffff;
			overflow: auto;
			overflow-x: hidden;
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			bottom: 0;
			border-top-right-radius: 8px;
		}

		.rightWrapper {
			border-top-left-radius: 8px;
			padding: 15px 15px 0 15px;
			flex: 1;
			box-shadow: -1px 0 5px #ebebeb;
			background: #ffffff;
			overflow: auto;
			overflow-x: hidden;
			box-sizing: border-box;
			position: absolute;
			top: 60px;
			left: 210px;
			right: 0;
			bottom: 0;
		}
	}
}
.editUserDiv {
	line-height: 32px;

	.editUserLeft {
		color: #999999;
	}

	.editUserRight {
		color: #333333;

		.userInp {
			width: 200px;
			margin-right: 30px;
			float: left;
		}
	}
}

// .item {
// 	margin-top: 10px;
// 	margin-right: 40px;
// }
</style>
