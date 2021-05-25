<template>
	<view>
		<!-- 充电线设备标题 -->
		<view class="cu-bar bg-white flex align-center">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-bold">充电线设备 </text>
				<text @click="scanAdd" class="cuIcon-scan scan-add"></text>
				<text @click="deleteAll" class="cuIcon-deletefill delete-all textColor"></text>
			</view>
		</view>
		<!-- 搜索充电线设备 -->
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input placeholder="搜索设备" @click="toggleSpec" data-target="bottomModal" disabled
						:adjust-position="false" type="text" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<!-- 设备列表展示 -->
		<view class="box" v-if="installQuery.device_sn.length>0">
			<view class="box-content">
				<view class="box-title">设备编号：</view>
				<view class="box-device" style="overflow: scroll; max-height: 55vh;">
					<view class="box-item" v-for="(item,index) in installQuery.device_sn" :key="index">
						<view>{{item.device_sn}}<text @click="deleteDevice(item.device_sn, index)"
								class="cuIcon-delete position-icon"></text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 @touchmove.stop.prevent="stopPrevent"-->
		<view class="popup spec" :class="specClass" @click="toggleSpec">
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="cu-bar bg-white">
					<view @click="seletedAllBtn" :class="isSeletedAll ? 'textColor': ''"
						class="cuIcon-roundcheckfill action" style="font-size: 48upx;">
						<text style="margin-left: 12upx; font-size: 32upx;">全选</text>
					</view>
					<view class="action textColor" style="font-size: 32upx; margin-right: 30upx;" @tap="confirm">确定
					</view>
				</view>
				<view>
					<!-- 开始设备号/结算设备号 -->
					<view class="flex">
						<view class="cu-bar search bg-white">
							<view class="search-form round">
								<text class="cuIcon-search"></text>
								<input type="number" class="text-left" v-model="query.start_device_sn"
									@input="startKeywordInput" :adjust-position="false" placeholder="开始设备号"
									confirm-type="search"></input>
								<view class="cuIcon-scan scan-logo" @click="scanStart"></view>
							</view>
						</view>
						<view class="cu-bar search bg-white">
							<view class="search-form round">
								<text class="cuIcon-search"></text>
								<input type="number" class="text-left" v-model="query.end_device_sn"
									@input="endKeywordInput" :adjust-position="false" placeholder="结束设备号"
									confirm-type="search"></input>
								<view class="cuIcon-scan scan-logo" @click="scanEnd"></view>
							</view>
						</view>
					</view>
					<!-- 充电线编号 -->
					<view style="max-height: 65vh; overflow: auto;">
						<checkbox-group v-show="deviceArr.length>0" class="block" @change="CheckboxChange" checked>
							<view class="cu-form-group" v-for="(item,index) in deviceArr" :key="index">
								<view class="title flex align-center">充电线编号({{item.device_sn}})
									<text v-if="item.store_id" class="cuIcon-lock textColor"
										style="font-size: 35upx;margin-left: 10upx;"></text>
								</view>
								<checkbox :checked="item.disabled" color="#1CBBB4"
									:disabled="item.store_id ? true : false" :value="item.device_sn"></checkbox>
							</view>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import {
		searchDeviceApi
	} from '../../api/usbline.js'
	import {
		wxConfig
	} from '../../utils/index.js'
	import wxsdk from "../../assets/js/wxJSAPI.js"
	export default {
		data() {
			return {
				installQuery: {
					device_sn: [],
				},
				query: {
					start_device_sn: '',
					end_device_sn: '',
				},
				specClass: 'none', // 弹窗
				isSeletedAll: false,
				// 搜索设备数组
				deviceArr: [],
				checkboxArr: [],
				isConfirm: false,
			};
		},
		created() {

		},
		methods: {
			confirm() {
				this.isConfirm = !this.isConfirm
				var values = this.checkboxArr
				let device_sns = this.installQuery.device_sn.map(item => {
					return item.device_sn
				})
				for (var i = 0; i < values.length; i++) {
					if (device_sns.indexOf(values[i]) == -1) {
						let newData = {
							device_sn: values[i]
						};
						this.installQuery.device_sn.push(newData);
						this.emitFn()
					}
				}
				this.toggleSpec()
			},
			CheckboxChange(e) {
				var values = e.detail.value;
				console.log(values,'checkboxchange')
				this.checkboxArr = values
			
				this.deviceArr.forEach((item, index) => {
					if (values.indexOf(item.device_sn) !== -1) {
						item.disabled = true
					} else {
						item.disabled = false
					}
				})
			
				this.isSeletedAll = this.deviceArr.every(item => {
					return item.disabled
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
					if(this.isConfirm) {
						this.emitFn()
					} else {
						this.checkboxArr = []
					}
				} else if (this.specClass === 'none') {
					this.isSeletedAll = false
					this.specClass = 'show';
					this.isConfirm = false
					this.getSearchDevice()
				}
			},
			// 查找设备
			getSearchDevice() {
				uni.showLoading({
					title: '加载中...'
				})
				this.deviceArr = []
				searchDeviceApi(this.query).then(res => {
					res.data.data.forEach((item, index) => {
						this.deviceArr.push(Object.assign({}, item, {
							disabled: false
						}))
					})
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
				})
			},
			// 全选
			seletedAllBtn() {
				//有门店就返回true
				var result = this.deviceArr.some(item => {
					return item.store_id > 0
				})

				if (!result) {
					// 没门店情况下
					this.isSeletedAll = !this.isSeletedAll
					if (this.isSeletedAll) {
						this.deviceArr.forEach(function(item) {
							return item.disabled = true
						})
						// 赋值绑定设备
						var values = this.deviceArr
						// this.installQuery.device_sn = []
						// for (var i = 0; i < values.length; i++) {
						// 	this.installQuery.device_sn.push({
						// 		device_sn: values[i].device_sn
						// 	})
						// }
						this.checkboxArr = []
						console.log('this.de',values)
						for (var i = 0; i < values.length; i++) {
							this.checkboxArr.push(values[i].device_sn)
						}
					} else {
						this.deviceArr.forEach(function(item) {
							return item.disabled = false
						})
						// this.installQuery.device_sn = []
						this.checkboxArr = []
					}
				}
				
				console.log(this.installQuery, 'this.installQuery')
			},
			deleteDevice(device_sn, index) {
				if (this.installQuery.device_sn.length > 0) {
					uni.showModal({
						content: '是否删除设备：' + device_sn,
						confirmColor: this.$store.state.srcPicColor,
						success: (res) => {
							if (res.confirm) {
								this.installQuery.device_sn.splice(index, 1)
								this.emitFn()
							}
						}
					})
				}
			},
			deleteAll() {
				if (this.installQuery.device_sn.length > 0) {
					uni.showModal({
						content: '是否清除下列所有设备编号！',
						confirmColor: this.$store.state.srcPicColor,
						success: (res) => {
							if (res.confirm) {
								this.installQuery.device_sn = []
								this.emitFn()
							}
						}
					})
				} else {
					this.$api.msg('请添加设备')
				}
			},
			emitFn() {
				this.$emit('deviceSn', this.installQuery.device_sn)
			},
			async scanAdd() {
				await wxConfig({
					apis: 'scanQRCode'
				})
				wxsdk.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res) => {
						let result = res.resultStr.match(/sn=([\w]*)/)
						let device_sn = result ? result[1] : res.resultStr

						let device_sns = this.installQuery.device_sn.map(item => {
							return item.device_sn
						})

						if (device_sns.indexOf(device_sn) == -1) {
							let newData = {
								device_sn: device_sn
							};
							this.installQuery.device_sn.push(newData);
							this.emitFn()
						}
					}
				});
			},
			async scanStart() {
				await wxConfig({
					apis: 'scanQRCode'
				})
				wxsdk.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res) => {
						var result = res.resultStr.match(/sn=([\w]*)/)
						this.query.start_device_sn = result ? result[1] : res.resultStr
						this.getSearchDevice()
					}
				});
			},
			async scanEnd() {
				await wxConfig({
					apis: 'scanQRCode'
				})
				wxsdk.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: (res) => {
						var result = res.resultStr.match(/sn=([\w]*)/)
						this.query.end_device_sn = result ? result[1] : res.resultStr
						if (this.query.start_device_sn) {
							this.getSearchDevice()
						} else {
							this.$api.msg('开始设备号不能为空')
						}
					}
				});
			},
			debounceInput() {
				this.inputTimeout && clearTimeout(this.inputTimeout)
				this.inputTimeout = setTimeout(this.getSearchDevice, 300)
			},
			startKeywordInput(event) {
				this.debounceInput()
			},
			endKeywordInput(event) {
				if (this.query.start_device_sn) {
					this.debounceInput()
				} else {
					this.$api.msg('开始设备号不能为空')
				}
			},
			stopPrevent() {},
		}
	};
</script>

<style lang="scss">
	@import 'da-device-install.scss';
</style>
