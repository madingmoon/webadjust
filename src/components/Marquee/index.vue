<template>
	<div class='marquee' v-html="noticeJson.content"></div>
</template>

<script>
	import $ from 'jquery'
	import 'jquery.marquee'

	export default {
		name: 'marquee',
		props: {
			notice: {
				type: Object
			}
		},
		data() {
			return {
				noticeJson: this.notice
			}
		},
		watch: {
			notice(val) {
				this.noticeJson = val
			}
		},
		created() {
			this.$i18n.locale = 'zh-CN'
			if (this.$cookieStore.getCookie('Accept-Language')) {
				this.$i18n.locale = this.$cookieStore.getCookie('Accept-Language')
			} else {
				this.$i18n.locale = navigator.language || navigator.userLanguage
			}
		},
		mounted() {
			$('.marquee').marquee({
				direction: this.noticeJson.direction ? this.noticeJson.direction : 'left', //方向（默认为left，下同）
				delayBeforeStart: this.noticeJson.delay ? this.noticeJson.delay : 1000, //滚动开始延迟时间（单位：毫秒）
				gap: this.noticeJson.gap ? this.noticeJson.gap : window.innerWidth - 100, //滚动一个周期的间距（单位：px）
				duplicated: this.noticeJson.duplicated ? this.noticeJson.duplicated : true, //无缝衔接
				startVisible: this.noticeJson.start ? this.noticeJson.start : true, //初始位置设置
				speed: this.noticeJson.speed ? this.noticeJson.speed : 50,
			});
		}
	}
</script>

<style scoped>
	.marquee {
		width: 100%;
		/* the plugin works for responsive layouts so width is not necessary */
		overflow: hidden;
		color: #409EFF;
	}

	@media (max-width: 768px) {
		.marquee {
			padding-left: 0;
		}
	}
</style>
