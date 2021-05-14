<template>
	<view class="prompt-box" :hidden="isHidden">
		<view class="prompt-content">
			<view class="prompt-title">{{title}}</view>
			<input class="prompt-input" type="text" v-model="name" placeholder="请输入真实姓名"/>
			<input class="prompt-input" type="number" v-model="cost" placeholder="请输入金额"/>
			<view class="prompt-btn-group">
				<button class="btn-item prompt-cancel-btn" @tap="_cancel">{{btn_cancel}}</button>
				<button class="btn-item prompt-certain-btn" @tap="_confirm">{{btn_certain}}</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isHidden: true,
				cost: '',
				name: '',
			};
		},
		props: {
			title: {
				type: String,
				default: '提现'
			},
			btn_cancel: {
				type: String,
				default: '取消'
			},
			btn_certain: {
				type: String,
				default: '确定'
			},
			text: {
				type: String,
				default: '',
			}
		},
		methods: {
			hide() {
				this.isHidden = true;
			},
			show(e) {
				this.isHidden = false;
				if (e != null && e != undefined && e != "") {
					this.text = e;
				}
			},
			_cancel() {
				this.cost = '';
				this.name = '';
				this.hide();
			},
			_confirm() {
				this.hide();
				this.$emit('onConfirm', this.name, this.cost);
			},
		}
	}
</script>

<style lang="scss">
	.prompt-box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 11;

		.prompt-content {
			position: absolute;
			left: 50%;
			top: 40%;
			width: 80%;
			max-width: 600upx;
			border: 2upx solid #ccc;
			border-radius: 10upx;
			box-sizing: border-box;
			transform: translate(-50%, -50%);
			overflow: hidden;
			background: #fff;

			.prompt-title {
				width: 100%;
				padding: 30rpx;
				text-align: center;
				font-size: 35upx;
				border-bottom: 0.5upx solid #DEDEDE;
			}

			.prompt-input {
				border-radius: 10upx;
				border: 1upx solid #39b54a;
				padding: 1% 3%;
				font-size: 30upx;
				margin: 50upx auto;
				width: 80%;
				height: 70upx;
				line-height: 60upx;
			}

			.prompt-btn-group {
				display: flex;
				flex-grow: 1;

				.btn-item {
					width: 35%;
					margin-bottom: 50rpx;
				}

				.prompt-certain-btn {
					color: #FFFFFF;
					font-size: 30upx;
					background-color: #39b54a;
					box-shadow: 0upx 0upx 10upx #CCCCCC;
				}

				.prompt-cancel-btn {
					box-shadow: 0upx 0upx 10upx #CCCCCC;
					color: #39b54a;
					font-size: 30upx;
				}
			}
		}
	}
</style>
