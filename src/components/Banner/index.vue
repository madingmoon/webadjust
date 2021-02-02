<template>
	<div class="banner">
		<div class="bannerArea" v-if="bannerdata.length == 1">
			<img class="bannerImg" :src="screenWidth>768?bannerdata[0].img:(bannerdata[0].img_mobile?bannerdata[0].img_mobile:bannerdata[0].img)"
			 alt="" />
		</div>
		<div class="swiper-container" v-else>
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in bannerdata" :key="index">
					<img class="bannerimg" :src="screenWidth>768?item.img:(item.img_mobile?item.img_mobile:item.img)" :class="'bannerImg'+ index "
					 alt="" />
				</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
	import Swiper from "swiper";
	import "swiper/dist/css/swiper.min.css";

	export default {
		name: "banner",
		props: {
			bannerData: {
				type: Array
			},
		},
		watch: {
			bannerData(val) {
				this.bannerdata = val
			},
			screenWidth(val) {
				this.screenWidth = val
			},
		},
		data() {
			return {
				bannerdata: this.bannerData,
				screenWidth: document.body.clientWidth,
			};
		},
		mounted() {
			var mySwiper = new Swiper(".swiper-container", {
				autoplay: 2000,
				loop: true,
				autoplayDisableOnInteraction: false,
				paginationClickable: true,
				pagination: ".swiper-pagination",
			});
			window.onresize = () => {
				return (() => {
					this.screenWidth = document.body.clientWidth
				})()
			}
		},
		methods: {},
	};
</script>

<style>
	.bannerimg,
	.bannerImg {
		width: 100%;
	}

	.swiper .swiper-button-next,
	.swiper .swiper-button-prev {
		width: 30px;
		height: 15px;
		top: 61%;
	}

	@media (max-width: 768px) {

		.swiper-button-next,
		.swiper-button-prev {}
	}
</style>
