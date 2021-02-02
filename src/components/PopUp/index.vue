<template>
	<div class="pop_box" v-if="popData.isOpen">
		<div class="pop_con_box">
			<div class="pop_header">
				<i class="pop_close el-icon-close" @click="close"></i>
			</div>
			<div class="pop_body">
				<div class="pop_icon" v-if="popData.icon">
					<i class="el-icon-warning" v-if="popData.icon=='warning'"></i>
					<i class="el-icon-error" v-else-if="popData.icon=='error'"></i>
					<i class="el-icon-success" v-else="popData.icon=='success'"></i>
				</div>
				<div class="pop_mainTitle" v-if="popData.mainTitle" v-html='popData.mainTitle'></div>
				<div class="pop_content" v-if="popData.content" v-html='popData.content'></div>
				<!-- 单个按钮 -->
				<div class="pop_btn_box">
					<div class="pop_btn" @click="btnClick">{{$t('m.confirm')}}</div>
				</div>
				<!-- 两个按钮 -->
				<!-- <div class="pop_btn_box">
					<div class="pop_btn" @click="confirmClick">{{$t('m.confirm')}}</div>
					<div class="pop_btn" @click="closeClick">{{$t('m.cancel')}}</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Popup',
		data() {
			return {
				popData: this.popdata
			}
		},
		props: {
			popdata: {
				type: Object
			},
		},
		watch: {
			popdata(val) {
				this.popData = val
			}
		},
		methods: {
			close() {
				if (this.popData.close) {
					this.popData.close()
				}
				this.popData = {}
			},
			// 单个按钮
			btnClick() {
				if (this.popData.btnClick) {
					this.popData.btnClick()
				}
				this.popData = {}
			},
			// 两个按钮
			// confirmClick(){
			// 	if(this.popData.confirmClick){
			// 		this.popData.confirmClick()
			// 	}
			// 	this.popData = {}
			// },
			// closeClick(){
			// 	if(this.popData.closeClick){
			// 		this.popData.closeClick()
			// 	}
			// 	this.popData = {}
			// }
		}
	}
</script>

<style scoped>
	.pop_box {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.5);
		transition: all 0.3s;
	}

	.pop_con_box {
		width: 400px;
		min-height: 280px;
		background-color: #fff;
		border-radius: 5px;
		padding: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: all 1s;
	}

	.pop_header {
		text-align: right;
		transition: all 0.3s;
	}

	.pop_close {
		font-size: 25px;
		color: #666;
		cursor: pointer;
		transition: all 0.3s;
	}

	.pop_icon {
		font-size: 64px;
		text-align: center;
		margin-top: 24px;
		transition: all 0.3s;
	}

	.el-icon-warning {
		color: #E6A23C;
	}

	.el-icon-error {
		color: #F56C6C;
	}

	.el-icon-success {
		color: #67C23A;
	}

	.pop_mainTitle {
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		text-align: center;
		margin-top: 24px;
	}

	.pop_content {
		font-size: 14px;
		color: #333333;
		text-align: center;
		margin-top: 12px;
	}

	.pop_btn_box {
		display: flex;
		justify-content: center;
		padding-top: 24px;
	}

	.pop_btn {
		width: 180px;
		height: 45px;
		font-size: 16px;
		color: #fff;
		line-height: 45px;
		text-align: center;
		background-color: #106fc4;
		border-radius: 6px;
		cursor: pointer;
		/* 两个按钮 */
		/* width: 120px;
		height: 45px;
		font-size: 16px;
		color: #fff;
		line-height: 45px;
		text-align: center;
		background-color: #106fc4;
		border-radius: 6px;
		cursor: pointer; */
	}

	.pop_btn+.pop_btn {
		margin-left: 12px;
		background: #fff;
		color: #666;
		border: 1px solid #666;
	}

	@media (max-width: 768px) {
		.pop_con_box {
			width: 72%;
			min-height: 250px;
		}

		.pop_icon {
			margin-top: 12px;
		}

		.pop_mainTitle {
			margin-top: 12px;
		}
	}
</style>
