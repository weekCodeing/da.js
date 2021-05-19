export function formatCookie(cookies = ''){
    let _cookies = {};
	let re = new RegExp(/([\w\-.]*)=([^\s=]+);/g)
	let res = null
	while(res = re.exec(cookies)){
		if(res[1] !== 'path'){
			_cookies[res[1]] = res[2]
		}
	}
	return _cookies
};

export function setCookie(cookies){
	const oldCookies = getCookie() || {}
	if(typeof cookies == 'string'){
		cookies =  formatCookie(cookies) 
	}
	uni.setStorageSync('wx-cookie', Object.assign(oldCookies, cookies));
}

export function getCookieStr(){
	const cookies = getCookie() || {}
	let str = ''
	for(let key in cookies){
		str += key+'='+cookies[key]+'; '
	}
	return str
}

export function getCookie(key = ''){
	const cookies = uni.getStorageSync('wx-cookie');
	if(cookies && key){
		return cookies[key]
	}else{
		return cookies
	}
}

export function clearCookie(key = null){
	uni.removeStorageSync('wx-cookie')
}

export function removeCookie(key){
	let cookies = getCookie()
	delete cookies[key]
	uni.setStorageSync('wx-cookie', cookies);
	return true
}
