<template>
	<view id="loading">
		<u-loading :show="show" color="blue" size="40" model="circle"></u-loading>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {};
		},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {},
		destroyed() {}
	}
</script>

<style lang="scss">
</style>
