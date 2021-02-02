<template>
	<div class="infomation">
		<headers :activeIndex="activeIndex"></headers>
		<swipers :bannerData="bannerData"></swipers>
		<marquee :notice="notice"></marquee>
		<div class="mations">
			<el-button type="primary" @click="open">{{$t('m.information.open')}}</el-button>
			<div class="svgArea">
				<svg-icon icon-class="icon"></svg-icon>
				<svg-icon icon-class="money"></svg-icon>
				<svg-icon icon-class="qq"></svg-icon>
				<svg-icon icon-class="wechat"></svg-icon>
			</div>
		</div>
		<popUp :popdata='popdata'></popUp>
		<share></share>
	</div>

</template>

<script>
	import swipers from "@/components/Banner"
	import popUp from '@/components/PopUp'
	import {
		popOpen
	} from '@/utils/popOpen'
	import share from '@/components/WxShare'
	import marquee from '@/components/Marquee'
	import headers from '@/components/Header'

	export default {
		name: "informations",
		components: {
			swipers,
			popUp,
			share,
			marquee,
			headers
		},
		data() {
			return {
				activeIndex: '1',
				activeName: "first",
				bannerData: [{
						img: "https://img.kaikeba.com/platform/738192210202uqrk.jpg",
						img_mobile: "",
					},
					{
						img: "https://img.kaikeba.com/platform/414142101202lkkb.jpg",
						img_mobile: "",
					},
					{
						img: "https://img.kaikeba.com/platform/327140210202nuoo.png",
						img_mobile: "",
					},
					{
						img: "https://img.kaikeba.com/platform/204150101202ayco.png",
						img_mobile: "",
					},
					{
						img: "https://img.kaikeba.com/platform/417172110202qgxr.jpg",
						img_mobile: "",
					},
				],
				notice: {
					content: this.$t('m.information.notice')
				},
				popdata: {
					isOpen: false
				}
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
			open() {
				let _this = this
				popOpen(_this, true, '', 'success', this.$t('m.information.title'), this.$t('m.information.content'), '')
			}
		},
	};
</script>

<style scoped>
	.infomation {
		padding: 0 0 20px 0;
	}

	.infiniteArea p {
		text-align: center;
	}

	.mations {
		width: 84%;
		margin: 20px auto;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.mations div {
		margin-top: 20px;
	}

	.svg-icon {
		color: #409EFF;
		font-size: 4em;
	}

	.infinite-list {
		height: 300px;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.infinite-list .infinite-list-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #e8f3fe;
		margin: 10px;
		color: #7dbcfc;
	}

	@media (max-width: 768px) {
		.mations {
			width: 100%;
			margin: 20px auto;
			padding: 0 20px;
		}
	}
</style>
