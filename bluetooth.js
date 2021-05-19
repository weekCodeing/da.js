import CryptoJs from '@/utils/CryptoJS.js'
let o = {
	blueIsOpen: false,
	devices: [],
	isDiscoveryDevices: false,
	connected: false,
	connectHistory: [],
	charactHistory: [],
	device:{
		deviceSn: '',
		deviceId: '',
		serviceId: "",
		characteristicWrite: "",
		characteristicNotify: "",
		rootKey1: '',
		rootKey2: '',
		userSecret: '',
		receiveCall: {},
		//接收信息
		receiveMsg(msg){
			let d = o.device
			msg = msg.toUpperCase()
			var api = msg.substr(0,6)
			if(api == 'AA55E6'){
				var content = CryptoJs.Decrypt(msg.substr(6,32), d.rootKey1)
			}else if(api == 'AA55E7'){
				var content = CryptoJs.Decrypt(msg.substr(6,32), d.rootKey2)
			}else{
				var content = CryptoJs.Decrypt(msg.substr(6,32), CryptoJs.str2hexStr(d.userSecret))
			}
			var msg2 = api + content.toUpperCase() + msg.substr(-2)
			console.log('已接收（密）：', msg)
			console.log('已接收（明）：', msg2)
			console.log('校验和（明）：',d.computeSum(msg2.slice(0,-2)).toUpperCase());
			console.log('校验和（密）：',msg.slice(-2).toUpperCase());
			let result = {
				code: -1,
				msg:''
			}
			if(d.computeSum(msg2.slice(0,-2)).toUpperCase() !== msg.slice(-2).toUpperCase()){
				result.msg = '数据传输失败'
			}
			//业务处理
			if(api == 'AA55E4'){ //设置ID回复
				var res = parseInt(content.substr(0,2))
				if(res == 0){
					result = {
						code: 1,
						msg: '设置成功'
					}
				}else if(res == 1){
					result.msg = '设置ID失败,数据传输失败'
				}else if(res == 2){
					result.msg = '设置ID失败,原ID错误'
				}
			}else if(api == 'AA55E3'){ //读取ID回复
				if(parseInt(content.substr(0,2)) == 1){
					result.msg = '数据传输失败'
				}else{
					result = {
						code: 1,
						deviceSn: parseInt( content.substr(-8), 16)
					}
				}
			}else if(api == 'AA55E2'){ //获取剩余充电时间
				if(parseInt(content.substr(0,2)) == 1){
					result.msg = '数据传输失败'
				}else{
					result = {
						code: 1,
						deviceTime: parseInt( content.substr(-4), 16)
					}
				}
			}else if(api == 'AA55E1'){ //设置充电时间
				var res = parseInt(content.substr(0,2))
				if(res == 1){
					result.msg = '数据传输失败'
				}else if(res == 2){
					result.msg = '其他错误'
				} else {
					result = {
						code: 1
					}
				}
			}else if(api == 'AA55E5'){
				if(parseInt(content.substr(0,2)) == 1){
					result.msg = '数据传输失败'
				}else{
					result = {
						code: 1,
						token: content.substr(0,24).toUpperCase()
					}
				}
			}else if(api == 'AA55E6'){
				if(parseInt(content.substr(0,2)) == 1){
					result.msg = '设置用户秘钥1失败'
				}else{
					result = {
						code: 1,
					}
				}
			}else if(api == 'AA55E7'){
				if(parseInt(content.substr(0,2)) == 1){
					result.msg = '设置用户秘钥2失败'
				}else{
					result = {
						code: 1,
					}
				}
			}
			//回调
			if(result.code == 1){
				result.msg = 'success'
				if(d.receiveCall[api] && d.receiveCall[api].success){
					d.receiveCall[api].success(result)
					d.receiveCall[api] = null
				}
			}else{
				d.receiveCall[api] && d.receiveCall[api].fail && d.receiveCall[api].fail(result)
			}
		},
		//发送信息
		sendMsg(msg,param){
			var d = o.device
			var sum = d.computeSum(msg);
			var api = msg.substr(0,6);
			//设置回调
			d.receiveCall[api] = param
			if(api == 'AA55E6'){
				var msg2 = api + CryptoJs.Encrypt(msg.substr(6,32), d.rootKey1)
			}else if(api == 'AA55E7'){
				var msg2 = api + CryptoJs.Encrypt(msg.substr(6,32), d.rootKey2)
			}else{
				var msg2 = api + CryptoJs.Encrypt(msg.substr(6,32), CryptoJs.str2hexStr(d.userSecret))
			}
			msg2 = msg2 + sum
			msg2 = msg2.toUpperCase()
			o.writeBLECharacteristicValue({
				msg: msg2
			})
			console.log('已发送(明)：', msg)
			console.log('已发送(密)：', msg2)
		},
		//获取设备剩余充电时间
		getDeviceTime(param){
			var order = 'AA55E2' + o.device.randomNum(32);
			o.device.sendMsg(order,param)
		},
		//设置设备充电时间
		setDeviceTime(param){
			o.device.readToken({
				success:res=>{
					var order = 'AA55E1' + res.token.substr(0,20) + o.getHex(o.device.deviceSn,4) + o.getHex(param.time,2)
					o.device.sendMsg(order,param)
					console.log('设置充电成功')
				},
				fail: err=>{
					param.fail(err)
					console.log('设置充电失败')
				}
			})
		},
		//读取通信token
		readToken(param){
			var order = 'AA55E5' + o.device.randomNum(32)
			o.device.sendMsg(order,param) // this.
		},
		//计算校验和
		computeSum(hex){
			var sum = 0;
			for(var i=0; i<38; i+=2){
				sum += parseInt(hex.substr(i, 2), 16)
			}
			var chenKSum = ('00'+sum.toString(16)).substr(-2)
			return chenKSum
		},
		//获取指定位数的随机数
		randomNum(n){ 
			var t = ''; 
			for(var i=0;i<n;i++){ 
				t += Math.floor(Math.random()*10); 
			} 
			return t; 
		}
	},
	
	//获取服务
	getBLEDeviceServices(){
		
		var d = o.device
		console.log('获取服务', d.deviceId, d.serviceId)
		uni.getBLEDeviceServices({
			deviceId: d.deviceId,
			success: ({services})=>{
				console.log(services,'获取服务')
				if(services.length < 1){
					uni.showModal({
						title:'获取服务失败'
					})
					return false
				}

				d.serviceId = services[1] ? services[1].uuid : services[0].uuid
				
				console.log('getBLEDeviceServices', o.device)
				o.getBLEDeviceCharacteristics()
			},
			false: err=>{
				console.log(err)
				uni.showModal({
					title:'获取服务失败'
				})
			}
		})
	},
	//获取服务特征
	getBLEDeviceCharacteristics(){
		var d = o.device
		console.log(d , "获取服务特征")
		uni.getBLEDeviceCharacteristics({
			deviceId: d.deviceId,
			serviceId: d.serviceId,
			success: ({characteristics})=>{
				console.log(characteristics)
				console.log('characteristics[0]',characteristics[0])
				console.log('characteristics[1]',characteristics[1])
				if(characteristics.length < 2){
					uni.showModal({
						title:'获取服务特征失败'
					})
					return false
				}
				
				// #ifndef MP-ALIPAY
				d.characteristicNotify = characteristics[0].uuid
				d.characteristicWrite = characteristics[1].uuid
				// #endif
				// #ifdef MP-ALIPAY
				d.characteristicNotify = characteristics[0].characteristicId
				d.characteristicWrite = characteristics[1].characteristicId
				// #endif
				
				o.notifyBLECharacteristicValueChange()
			},
			false: err=>{
				console.log(err)
				uni.showModal({
					title:'获取服务特征失败'
				})
			}
		})
	},
	// 监听低功耗蓝牙设备的特征值变化事件
	notifyBLECharacteristicValueChange(){
		var d = o.device
		console.log(d,'监听低功耗蓝牙设备的特征值变化事件')
		// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
		uni.notifyBLECharacteristicValueChange({
			state: true, // 启用 notify 功能
			deviceId: d.deviceId,
			serviceId: d.serviceId,
			characteristicId: d.characteristicNotify,
			success: (res)=>{
				console.log('notifyBLECharacteristicValueChange success', res.errMsg)
				o.onBLECharacteristicValueChange()
			}
		})
	},
	writeBLECharacteristicValue(param){
		var d = o.device
		const buffer = new Uint8Array(param.msg.match(/[\da-f]{2}/gi).map(function (h) {
				return parseInt(h, 16)
			})).buffer
		uni.writeBLECharacteristicValue({
			deviceId: d.deviceId,
			serviceId: d.serviceId,
			characteristicId: d.characteristicWrite,
			value: buffer,
			success:(res)=>{
				param.success && param.success(res);
				console.log('writeBLECharacteristicValue success', res.errMsg)
			},
			fail:(err)=>{
				param.fail && param.fail(err);
				console.log(err)
			}
		})
	},
	onBLECharacteristicValueChange(){
		// 监听低功耗蓝牙设备的特征值变化事件。
		// #ifdef MP-ALIPAY
		my.offBLECharacteristicValueChange()
		// #endif
		
		// #ifdef MP-WEIXIN
		wx.offBLECharacteristicValueChange()
		// #endif
		
		uni.onBLECharacteristicValueChange(res=>{
			console.log(res, 'res', res.value)
			// #ifndef MP-ALIPAY
			var str = o.ab2hex(res.value);
			// #endif
			// #ifdef MP-ALIPAY
			var str = res.value;
			// #endif
			o.device.receiveMsg(str)
		})
	},
	
	// 连接设备
	connectDevice(param) {
		// 判断是否已连接 同时存在 设备编号，回调创建连接成功
		if(o.connected && o.device.deviceSn == param.deviceSn) {
			param.success && param.success();
			return
		}
		// 打开蓝牙模块
		console.log('连接设备',param.deviceSn)
		o.openBlue({
			success: _=>{
				// 寻找设备
				o.discoveryDevices({
					deviceSn: param.deviceSn,
					success: d=>{
						// 创建连接
						o.createConnection({
							deviceId: d.deviceId,
							deviceSn: d.deviceSn,
							success: param.success,
							fail: _=> {
								param.fail && param.fail({
									code: -3,
									msg: '连接蓝牙失败!'
								})
							}
						})
					},
					fail: _=>{
						param.fail && param.fail({
							code: -2,
							msg: '查找设备失败!'
						})
					}
				})
			},
			fail: err=>{
				param.fail && param.fail({
					code: -1,
					msg: '打开蓝牙失败!',
					err: err
				})
			}
		})
	},
	// 初始化蓝牙模块
	openBlue(param) {
		uni.openBluetoothAdapter({
			success: res=>{
				console.log(res, 'openBluetoothAdapter success')
				o.blueIsOpen = true
				
				o.onBLEConnectionStateChange()
				
				param.success && param.success(o)
			},
			fail: err=>{
				if(param.fail){
					param.fail(err)
				}else{
					uni.showModal({title: '请先打开蓝牙',showCancel: false})
				}
			}
		})
	},
	closeBlue(){
		uni.closeBluetoothAdapter({
			success(res) {
				o.device.deviceId = ''
				o.connected = false
			    o.blueIsOpen = false
				console.log('关闭蓝牙成功',res)
			}
		})
	},
	// 开始搜寻附近的蓝牙外围设备。
	discoveryDevices(param) {
		o.isDiscoveryDevices = true
		uni.startBluetoothDevicesDiscovery({
			allowDuplicatesKey: true,
			success: res=>{
				console.log('找到蓝牙',res)
			}
		})
		o.onDeviceFound(param)
		setTimeout(_=>{
			let isDiscoveryDevices = o.isDiscoveryDevices
			if(isDiscoveryDevices){
				o.stopDiscoveryDevices()
				param.fail && param.fail()
			}
		},10*1000)
	},
	// 停止搜寻附近的蓝牙外围设备。
	stopDiscoveryDevices(){
		o.isDiscoveryDevices = false
		uni.stopBluetoothDevicesDiscovery({
		  success(res) {
		    console.log(res)
		  }
		})
	},
	// 监听寻找到新设备的事件
	onDeviceFound(param){
		// #ifdef MP-ALIPAY
		my.offBluetoothDeviceFound()
		// #endif
		
		// #ifdef MP-WEIXIN
		wx.offBluetoothDeviceFound()
		// #endif
		
		uni.onBluetoothDeviceFound(({devices}) => {
			devices.forEach(device => {
				if (!device.name && !device.localName) {
					return
				}
				if(device.name == "LDTEK"){
					console.log('新设备',device)
					
					// #ifndef MP-ALIPAY
					let deviceSn = parseInt(o.ab2hex(device.advertisData),16)
					// #endif
					// #ifdef MP-ALIPAY
					let deviceSn = parseInt(device.advertisData,16)
					// #endif
					
					let d = {
						deviceSn: deviceSn,
						deviceId: device.deviceId,
						name: device.name,
						RSSI: device.RSSI
					}
					console.log(d,param)
/* 					let result = o.devices.some(item=>{
						return item.deviceId !== device.deviceId
					}) 
					if(result){
						o.devices.push(d)
					} */
					if(param.deviceSn && param.deviceSn == d.deviceSn && o.isDiscoveryDevices == true) {
						console.log('找到设备',param.deviceSn,d.deviceSn)
						o.stopDiscoveryDevices()
						param.success && param.success(d)
					}
				} 
			})
			
		})
	},
	createConnection(param) {
		// uni.showLoading({
		// 	title: '正在连接',
		// 	mask: true
		// })
		// 连接低功耗蓝牙设备。
		uni.createBLEConnection({
			deviceId: param.deviceId,
			success: res=>{
				o.device.deviceId = param.deviceId
				o.device.deviceSn = param.deviceSn
				console.log('连接成功，createBLEConnection')
				uni.hideLoading()
				o.connected = true
				o.getBLEDeviceServices()
				param.success && param.success(o)
			},
			fail: err=>{
				console.log(err, '连接失败')
				o.connected = false
				uni.hideLoading()
				param.fail && param.fail()
			}
		})
	},
	// 监听低功耗蓝牙连接状态的改变事件
	onBLEConnectionStateChange(){
		// #ifdef MP-ALIPAY
		my.offBLEConnectionStateChanged()
		// #endif
		
		// #ifdef MP-WEIXIN
		wx.offBLEConnectionStateChange()
		// #endif
		
		uni.onBLEConnectionStateChange(res=>{
			// 该方法回调中可以用于处理连接意外断开等异常情况
			console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`);
			if(!res.connected){
				console.log('断开低功耗蓝牙成功')
				o.device.deviceId = ''
				o.connected = false
			}else{
				// 连接成功返回connected: true, deviceId
				console.log('蓝牙连接成功')
				o.connected = true
			}
		})
	},
	// 断开与低功耗蓝牙设备的连接。
	closeConnection() {
/* 		uni.showLoading({
			title: '正在断开',
			mask: true
		}) */
		uni.closeBLEConnection({
			deviceId: o.device.deviceId,
			success:res=> {
				console.log(res)
				uni.hideLoading()
			},
			fail: err=>{
				console.log(err)
				uni.hideLoading()
			}
		})
	},
	// ArrayBuffer转16进度字符串示例
	ab2hex(buffer) {
		const hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function (bit) {
				return ('00' + bit.toString(16)).slice(-2)
			}
		)
		return hexArr.join('')
	},
	//10进制转16进制
	getHex(num,len){
		len = len * 2
		var t = '';
		for(var i=0;i<len;i++){ 
			t += 0; 
		}
		return (t + parseInt(num).toString(16)).substr(-len)
	},
}
export default o
