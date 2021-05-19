<template>
	<view id="myReply">
		<view class="bottom-reply" @click="myReplayBtn(0)">
			<u-line />
			<view class="reply">
				<u-avatar size="45" :src="avatar"></u-avatar>
				<view class="bg-input">
					<u-icon name="edit-pen-fill"></u-icon>
					我来说几句...
				</view>
			</view>
		</view>
		<view>
			<u-popup :safe-area-inset-bottom="true" mode="bottom" v-model="replayShow">
				<view class="my-reply">
					<u-input maxlength="1000" v-model="query.content" placeholder="我来说几句..." focus border type="textarea"/>
					<view @click="replayShowBtn" class="send" :class="query.content ? 'yesSend' : 'noSend'">
						发送
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>
 
<script>
	import {add_reply} from '../api/postManagement/index.js'
	export default {
		props: {
			post_id: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				avatar: this.$store.state.user.avatar,
				replayShow: false,
				query: {
					post_id: '',
					content: '',
					reply_id: 0
				},
			};
		},
		beforeCreate() {
		},
		created() {
		},
		methods: {
			myReplayBtn(id) {
				this.query.reply_id = id
				this.replayShow = true
			},
			replayShowBtn() {
				if(this.query.content) {
					uni.showLoading({
						mask: true,
						title: '发送中...'
					})
					add_reply(this.query).then(res=>{
						uni.showToast({
							icon: 'none',
							title: '发送成功'
						})
						this.$emit('getReplyList')
					}).catch(err=>{
						console.log(err)
					})
					this.query.content = ''
					this.replayShow = false
					setTimeout(_=>{
						uni.hideLoading()
					},100)
				} else {
					uni.showToast({
						icon: 'none',
						title: '评论不能为空'
					})
				}
			},
		},
		beforeMount() {
		},
		mounted() {
		},
		destroyed() {
		}
	}
</script>
 
<style lang="scss">
	.bottom-reply {
		z-index: 9999;
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		background-color: #fff;
		.reply {
			align-items: center;
			padding: 20rpx;
			display: flex;
			flex-direction: row;
			.bg-input {
				padding: 10rpx;
				margin-left: 12rpx;
				border-radius: 23rpx;
				background-color: rgb(242, 242, 242);
				width: 95%;
				color: #9a9a9a;
				font-size: 18rpx;
			}
		}
	}
	.my-reply {
		display: flex;
		align-items: center;
		padding: 20rpx;
		.send {
			padding: 0rpx 0rpx 0rpx 20rpx;
		}
		.yesSend {
			color: #5677fc;
			font-weight: bold;
		}
		.noSend {
			color: #9a9a9a;
			font-weight: bold;
		}
	}
</style>
