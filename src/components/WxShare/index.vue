<template>
	<div class="shareWrap"></div>
</template>

<script>
	import * as share from '@/api/index'

	export default {
		name: 'Wxshare',
		data() {
			return {
				img: '',
				title: '',
				desc: ''
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			// 微信分享
			setWxShare() {
				let isShareStr = location.href.split('#')[0]
				let isShare
				if (isShareStr.indexOf('?') > 0) {
					isShare = isShareStr.split('?')[0]
				} else {
					isShare = isShareStr
				}
				let isPageStr = location.href.split('#')[1]
				let href = isShare + '#/?' + isPageStr.split('?')[1]
				let share = {
					imgUrl: '',
					title: '',
					desc: '',
					link: href
				}
				this.$wxshare(share)
			}
		}
	}
</script>
