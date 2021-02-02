<template>
	<div class="Qheader" :class="scrolltop >= 70 ? 'bjcolor' : ''">
		<div class="header flex1">
			<!-- logo -->
			<div class="logo flex1">
				<img src="@/assets/img/components/header/logo.png" alt="" width="60px" />
				<span class="logo_name">{{$t('m.header.templateType')}}</span>
			</div>
			<!-- nav -->
			<div class="nav flex1" v-if="screenWidth >= 1180">
				<el-menu mode="horizontal" :default-active="activeindex" class="el-menu-vertical-demo" router v-for="(item, index) in navMenu"
				 :key="index">
					<el-submenu v-if="item.childs" :index="item.name" :route="item.value" class="edit_wrapper">
						<template slot="title">
							<span slot="title">{{ item.alias }}</span>
							<i class="iconfont icon-shenpi edit"></i>
						</template>
						<el-menu-item v-for="item1 in item.childs" :key="item1.name" v-if="item1.childs == null" :index="item1.name"
						 :route="item1.value">
							<span>{{ item1.alias }}</span>
						</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="item.name" :route="item.value">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.alias }}</span>
					</el-menu-item>
				</el-menu>
			</div>


			<!-- user -->
			<div class="user flex1">
				<el-dropdown v-if="screenWidth >= 1180" class="cursor lang" @command="lang">
					<div class="el-dropdown-link flex1 outline">
						<div>{{ langs }}</div>
						<i class="el-icon-arrow-down el-icon--right"></i>
					</div>
					<el-dropdown-menu slot="">
						<el-dropdown-item command="zh-CN">中文</el-dropdown-item>
						<el-dropdown-item command="en-US">English</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

				<div v-if="loginState">
					<el-dropdown @command="handleCommand" class="flex1">
						<div class="el-dropdown-link flex1 outline">

							<div class="userimg flex1">
								<img class="cursor" :src="user.usericon" alt="">
							</div>

							<div class="username ellipsis" :title="user.username" v-if="screenWidth >= 1180">
								<span class="cursor">{{user.username}}</span>
							</div>
							<i class="el-icon-arrow-down el-icon--right"></i>

						</div>

						<el-dropdown-menu slot="dropdown" class="userGo tc">
							<el-dropdown-item command="loOut">{{$t('m.header.quit')}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

				</div>

				<div class="login cursor" v-else>
					<span class="login1" @click="login1">{{$t('m.header.login')}}</span>
				</div>

				<!-- mobile nav -->
				<van-icon name="wap-nav" v-if="screenWidth <= 1180" @click="mebileNav" class="ml20 navlist cursor" />
				<div class="navMeun" v-if="drawer && screenWidth <= 1180">
					<div style="height:100%;background: rgba(0,0,0,.8);overflow:auto">
						<el-scrollbar style="height:100%">
							<el-menu class="el-menu-vertical-demo" :default-active="activeindex" router v-for="(item, index) in navMenu"
							 :key="index">
								<el-submenu index="1" v-if="item.childs" :index="item.name" :route="item.value" class="edit_wrapper">
									<template slot="title">
										<span>{{ item.alias }}</span>
									</template>
									<el-menu-item class="list1" v-if="item1.childs" v-for="(item1, index) in item.childs" :key="index" :index="item1.name"
									 :route="item1.value">
										<template slot="title" class="list1">
											<i :class="item1.icon"></i>
											<span slot="title">{{ item1.alias }}</span>
										</template>
									</el-menu-item>
									<el-menu-item v-for="item1 in item.childs" :key="item1.name" v-if="item1.childs == null" :index="item1.name"
									 :route="item1.value">
										<span>{{ item1.alias }}</span>
									</el-menu-item>
								</el-submenu>
								<el-menu-item v-if="item.childs == null" :index="item.name" :route="item.value">
									<i :class="item.icon"></i>
									<span slot="title">{{ item.alias }}</span>
								</el-menu-item>
							</el-menu>
						</el-scrollbar>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Qheader",
		data() {
			return {
				navMenu: [{
						name: "serveRelation",
						icon: "iconfont icon-shezhi",
						alias: this.$t('m.header.index'),
						value: "/",
					},
					{
						name: "serveList",
						icon: "iconfont icon-shezhi",
						alias: this.$t('m.header.service'),
						value: "",
						childs: [{
								name: "channelManage",
								icon: "",
								alias: this.$t('m.header.channel'),
								value: "",
							},
							{
								name: "process_services",
								icon: "",
								alias: this.$t('m.header.process'),
								value: "/serveManage/process_services",
							},
							{
								name: "cooperation_services",
								icon: "",
								alias: this.$t('m.header.cooperate'),
								value: "/serveManage/cooperation_services",
							},
						],
					},
					{
						name: "saveManage",
						icon: "",
						alias: this.$t('m.header.risk'),
						value: "/serveManage/saveManage",
					},
					{
						name: "manageDecision",
						icon: "",
						alias: this.$t('m.header.manage'),
						value: "/serveManage/manageDecision",
					},
					{
						name: "businessSupport",
						icon: "",
						alias: this.$t('m.header.business'),
						value: "/serveManage/businessSupport",
					},
					{
						name: "serveList",
						icon: "iconfont icon-shezhi",
						alias: this.$t('m.header.aboutus'),
						value: "",
						childs: [{
								name: "channelManage",
								icon: "",
								alias: this.$t('m.header.channel'),
								value: "",
							},
							{
								name: "process_services",
								icon: "",
								alias: this.$t('m.header.process'),
								value: "/serveManage/process_services",
							},
							{
								name: "cooperation_services",
								icon: "",
								alias: this.$t('m.header.cooperate'),
								value: "/serveManage/cooperation_services",
							},
						],
					},
					{
						name: "technicalSupport",
						icon: "",
						alias: this.$t('m.header.tech'),
						value: "/serveManage/technicalSupport",
					},
					{
						name: "serveRelation",
						icon: "iconfont icon-shezhi",
						alias: this.$t('m.header.relation'),
						value: "/serveManage/serveRelation",
					},
				],
				drawer: false,
				isNavTrue: true,
				langs: '中文',
				language: '',
				loginState: false,
				user: {
					username: '',
					usericon: ''
				},
				screenWidth: document.body.clientWidth,
				scrolltop: '',
				activeindex: this.activeIndex
			};
		},
		props: {
			activeIndex: {
				type: String
			}
		},
		created() {
			this.$i18n.locale = 'zh-CN'
			if (this.$cookieStore.getCookie('Accept-Language')) {
				this.$i18n.locale = this.$cookieStore.getCookie('Accept-Language')
				this.language = this.$cookieStore.getCookie('Accept-Language')
			} else {
				this.$i18n.locale = navigator.language || navigator.userLanguage
				this.language = navigator.language || navigator.userLanguage
			}
			if (this.language === 'zh-CN') {
				this.langs = '中文'
			} else {
				this.langs = 'English'
			}
		},
		mounted() {
			if (this.loginState = JSON.parse(sessionStorage.getItem('user')) != null) {
				this.loginState = JSON.parse(sessionStorage.getItem('user')).loginState
				this.user.username = JSON.parse(sessionStorage.getItem('user')).username
				this.user.usericon = JSON.parse(sessionStorage.getItem('user')).usericon
			}
			//获取窗口宽度
			const that = this
			window.onresize = () => {
				return (() => {
					window.screenWidth = document.body.clientWidth
					that.screenWidth = window.screenWidth
				})()
			}
			//获取高度
			window.addEventListener('scroll', this.scrollTop)
		},
		methods: {
			scrollTop() {
				this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
				this.scrolltop = this.scroll
			},
			login1() {
				this.$router.push("/Login")
			},
			lang(command) {
				this.langs = (command == 'zh-CN' ? '中文' : 'English')
				this.$cookieStore.setCookie('Accept-Language', command, {
					expires: 365
				})
				location.reload()
			},
			handleCommand(command) {
				if (command == "loOut") {
					sessionStorage.removeItem('user')
					sessionStorage.removeItem('state')
					this.loginState = false
				}
			},
			mebileNav() {
				this.drawer = !this.drawer
			}
		},
		watch: {
			screenWidth(val) {
				if (!this.timer) {
					this.screenWidth = val
					this.timer = true
					let that = this
					setTimeout(function() {
						that.timer = false
					}, 400)
				}
			},
			activeIndex(val) {
				this.activeindex = val
			}
		}
	};
</script>

<style scoped>
	.Qheader {
		width: 100%;
		height: 70px;
		background: #fff;
		z-index: 2000;
	}

	.header {
		width: 84%;
		height: 70px;
		margin: 0 auto;
	}

	.el-submenu,
	.el-menu--popup {
		width: 100px;
	}

	.logo {
		width: 190px;
		font-size: 18px;
	}

	.userimg {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 7px;
	}

	.userimg img {
		width: 35px;
	}

	.el-menu {
		border: 0;
	}

	.navlist {
		font-size: 26px;
	}

	.navMeun {
		width: 100%;
		height: 100%;
		color: #fff;
		position: fixed;
		top: 70px;
		left: 0;
		z-index: 2006;
		transition: all 1s;
		box-sizing: border-box;
	}

	.navMeun .el-menu-item,
	.navMeun .el-submenu__title span {
		color: #fff;
	}

	@media (min-width: 1200px) {
		.userGo {
			width: 150px;
		}

		.user {
			width: 215px;
		}

		.username {
			width: 84px;
		}

		.lang {
			margin-right: 20px;
		}
	}

	@media (max-width: 1200px) and (min-width: 768px) {}

	@media (max-width: 768px) {
		.logo img {
			width: 30px;
		}

		.logo {
			width: 140px;
			font-size: 14px;
		}

		.Qheader,
		.header {
			height: 50px;
		}

		.navMeun {
			top: 50px;
		}
	}
</style>
<style>
	.nav .el-menu-item,
	.nav .el-submenu__title {
		padding: 0 7px !important;
	}

	.el-menu--popup {
		width: auto;
		min-width: 100px;
	}

	.swiper-container .swiper-container-horizontal {
		display: flex;
		align-items: center;
	}

	.navMeun .el-menu-item,
	.navMeun .el-submenu__title {
		background: transparent;
		border-top: 1px #666 solid;
	}

	.navMeun .el-menu-item:focus,
	.navMeun .el-menu-item:hover,
	.navMeun .el-submenu__title:hover span {
		color: red;
	}

	.el-menu-item:focus,
	.el-menu-item:hover,
	.el-submenu__title:hover,
	.el-menu,
	.nav .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
	.nav .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
		background: transparent;
	}

	.navMeun .el-submenu,
	.navMeun .el-menu--popup {
		width: auto;
	}

	.navMeun .el-submenu__icon-arrow {
		font-size: 26px;
		margin-top: -13px;
	}

	.el-menu--popup-bottom-start li:hover {
		background-color: #ecf5ff !important;
		color: #66b1ff !important;
	}
</style>
