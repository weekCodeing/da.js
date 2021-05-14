<template>
	<view>
		<!-- 多列选择器 -->
		<picker mode="multiSelector" @change="changeTime" :value="multiIndex" :range="multiArray">
			<slot name="pCon"></slot>
		</picker>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				multiArray: [
					['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
						'13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
					],
					['00', '10', '20', '30', '40', '50']
				],
				multiIndex: [0, 0],
			};
		},
		methods: {
			changeTime(e) {
				this.multiIndex = e.detail.value;
				var one = this.multiIndex[0]
				var two = this.multiIndex[1]
				var time = this.multiArray[0][one] + ":" + this.multiArray[1][two]
				this.$emit('changeTime', time);
			}
		}
	};
</script>
<style lang="scss"></style>
