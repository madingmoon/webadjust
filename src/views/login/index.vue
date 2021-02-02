<template>
	<div class="login flex1">
		<!-- 登录 -->
		<div class="Login tc" v-if="registers">
			<h1 class="Title mb">{{$t('m.login.title')}}</h1>
			<el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="51px" class="demo-ruleForm">
				<el-form-item :label="this.$t('m.login.account')" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item :label="this.$t('m.login.password')" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-button :loading="loading" type="primary" @click="submitForm('ruleForm')" class="tc login_admin">{{$t('m.login.login')}}</el-button>
			</el-form>
			<p class="regi_pass">
				<a href="javascript: void(0)" @click="backIndex">{{$t('m.login.back')}}</a>
				<a class="ml15" href="javascript: void(0)" @click="resetForm('ruleForm')">{{$t('m.login.register')}}</a>
				<a class="ml15" href="javascript: void(0)">{{$t('m.login.forget')}}</a>
			</p>
		</div>
		<!-- 注册 -->
		<div class="Register tc" v-else>
			<h1 class="Title mb">{{$t('m.login.registerTitle')}}</h1>
			<el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="65px" class="demo-ruleForm">
				<el-form-item :label="this.$t('m.login.account')" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item :label="this.$t('m.login.password')" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="this.$t('m.login.phone')" prop="phone">
					<el-input type="" v-model="ruleForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-button :loading="loading" type="primary" @click="registerForm('ruleForm')" class="tc register_admin">{{$t('m.login.register')}}</el-button>
			</el-form>

			<p class="regi_pass">
				<a href="javascript: void(0)" @click="resetForm('ruleForm')">{{$t('m.login.hasAccount')}}</a>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				loading: false,
				registers: true,
				ruleForm: {
					name: "",
					pass: "",
					phone: ""
				},
				rules: {
					name: [{
							required: true,
							message: this.$t('m.login.needsAccount'),
							trigger: "blur"
						},
						{
							min: 6,
							max: 12,
							message: this.$t('m.login.accountMsg'),
							trigger: "blur",
						},
					],
					pass: [{
							required: true,
							message: this.$t('m.login.needsPassword'),
							trigger: "blur"
						}, //validator: validatePass
						{
							min: 6,
							max: 16,
							message: this.$t('m.login.passwordMsg'),
							trigger: "blur",
						},
					],
					phone: [{
							required: true,
							message: this.$t('m.login.needsPhone'),
							trigger: "blur"
						},
						{
							pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
							message: this.$t('m.login.phoneMsg'),
							trigger: 'blur'
						},
					],
				},
			};
		},
		created() {
			this.$i18n.locale = 'zh-CN'
			if (this.$cookieStore.getCookie('Accept-Language')) {
				this.$i18n.locale = this.$cookieStore.getCookie('Accept-Language')
			} else {
				this.$i18n.locale = navigator.language || navigator.userLanguage
			}
		},
		methods: {
			// 登录
			submitForm(formName) {
				let {
					name,
					pass
				} = this.ruleForm;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true;

						//死数据
						setTimeout(() => {
							if (name == "admins" && pass == "123456") {
								const user = {
									loginState: true,
									token: 'yyyyyy-ffffff-kkkkkk-rrrrrr',
									username: "小明",
									usericon: "https://portrait.gitee.com/uploads/avatars/user/1898/5696271_youzi_com_1608386730.png!avatar30"
								}
								sessionStorage.setItem("user", JSON.stringify(user))
								sessionStorage.setItem("state", "0")
								this.$store.dispatch('saveUserInfo', JSON.parse(sessionStorage.getItem('user')).token)
								this.$router.push("/");
							} else {
								this.$message.error(this.$t('m.login.wrongNum'));
								this.loading = false;
							}
						}, 1000);
					} else {
						this.loading = false
					}
				});
			},
			resetForm(formName) {
				this.registers = !this.registers
				this.$refs[formName].resetFields();
			},
			registerForm(formName) {
				let {
					name,
					pass,
					phone
				} = this.ruleForm;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true;
						setTimeout(() => {
							this.loading = false;
							this.$confirm(this.$t('m.login.registerSuc'), this.$t('m.login.notice'), {
								confirmButtonText: this.$t('m.confirm'),
								cancelButtonText: this.$t('m.cancel'),
								type: 'success'
							}).then(() => {
								this.registers = true
								this.$refs[formName].resetFields();
							}).catch(() => {
								this.$refs[formName].resetFields();
							});
						}, 1000);
						//死数据
					} else {
						this.loading = false
					}
				});
			},
			backIndex() {
				this.$router.push("/")
			}
		},
	};
</script>

<style scoped>
	.login {
		width: 100%;
		height: 100%;
		background: url("~@/assets/img/views/login/pcBanner.jpg") no-repeat;
		background-size: cover;
		position: relative;
		justify-content: center
	}

	.Login,
	.Register {
		width: 420px;
		padding: 30px;
		background: #fff;
		border-radius: 5px;
	}

	.Title {
		font-size: 24px;
		margin-bottom: 30px;
		color: blueviolet;
	}

	.login_admin {
		width: 370px;
		margin-left: 51px;
	}

	.register_admin {
		width: 355px;
		margin-left: 65px;
	}

	.regi_pass {
		line-height: 50px;
		text-align: right;
	}

	@media (max-width: 768px) {

		.Login,
		.Register {
			width: 300px;
			padding: 20px;
			background: #fff;
			border-radius: 5px;
		}

		.Title {
			font-size: 20px;
			margin-bottom: 20px;
			color: blueviolet;
		}

		.login_admin {
			width: 249px;
			margin: 5px 0 0 51px;
		}

		.register_admin {
			width: 235px;
			margin: 5px 0 0 65px;
		}

		.regi_pass {
			line-height: 40px;
			float: right;
		}
	}

	@media (max-width: 350px) {

		.Login,
		.Register {
			width: 240px;
			padding: 15px;
			background: #fff;
			border-radius: 5px;
		}

		.login_admin {
			width: 189px;
			margin: 5px 0 0 51px;
		}

		.register_admin {
			width: 175px;
			margin: 5px 0 0 65px;
		}

		.regi_pass {
			line-height: 30px;
			float: right;
		}
	}
</style>
<style>
	@media (max-width: 768px) {

		.el-input__inner,
		.login_admin,
		.register_admin {
			height: 30px;
			line-height: 30px;
			padding: 0 10px;
		}

		.el-form-item {
			margin-bottom: 14px;
		}

		.el-form-item__error {
			padding-top: 0;
		}

		.el-message-box,
		.el-message {
			min-width: auto !important;
			width: 80% !important;
		}
	}
</style>
