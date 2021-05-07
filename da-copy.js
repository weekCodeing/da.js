export default function uniCopy({content,success,error}) {
	// 如果内容不存在
	if(!content) return error('复制的内容不能为空 !')
	// 内容必须字符串，数字需要转换为字符串
	content = typeof content === 'string' ? content : content.toString()
	// 剪贴板API app,微信小程序，支付宝小程序，百度小程序，字节跳动小程序，qq小程序，除了H5平台不能使用
	// 设置系统剪贴板的内容
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: () => {
			success("复制成功~")
			console.log('success');
		},
		fail: () => {
			success("复制失败~")
		}
	});
	//#endif
	
	// H5端的复制逻辑
	// #ifdef H5
	// 确定浏览器是否支持指定的编辑指令
	if (!document.queryCommandSupported('copy')) { 
		//为了兼容有些浏览器 queryCommandSupported 的判断
		error('浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 方法用于选择该元素中的文本
	textarea.setSelectionRange(0, content.length) //选取范围
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if(result){
		success("复制成功~")
	}else{
		error("复制失败~")
	}	
	textarea.remove()
	// #endif
}
