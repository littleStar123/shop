import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'
const prePath="http://localhost:8081/shop"
const showLogs=1;
// axios.defaults.baseURL = '/api'
 axios.defaults.baseURL = 'http://127.0.0.1:8081/'
export const ajaxPost = function(url, params, callback, err) {
	console.log("post")
	axios({
		method: 'post',
		url: url,
		data: Qs.stringify(params)
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		if(err) {
			callback('error');
		}
	});
};


export const ajaxPostFile = function(url, params,callback, err) {
	let data = new FormData();
    data.append('file',params.file);
    data.append('sid',envConfig.sid);
    axios({
		method: 'post',
		url: url,
		data: data,
		headers:{'Content-Type':'multipart/form-data'}
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		if(err) {
			callback('error');
		}
	});
};

export const ajaxGet = function(url, params, callback, err) {
	axios.get(url, {
		params: params
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		if(err) {
			callback('error');
		}
	});
};

export const ajaxGetFile = function(url, params,filename) {
	axios.get(url, {
		params: params,
		responseType:'arraybuffer'
	}).then(function(result) {
		var linkElement = document.createElement('a');
		try {
	        var blob = new Blob([result], { type: 'application/octet-stream' });
	        var url = window.URL.createObjectURL(blob);
	        linkElement.setAttribute('href', url);
	        linkElement.setAttribute("download", filename+'.xls');
	        var clickEvent = new MouseEvent("click", {
	            "view": window,
	            "bubbles": true,
	            "cancelable": false
	        });
	        linkElement.dispatchEvent(clickEvent);
		 } catch (ex) {
            console.log(ex);
        }
	}).catch(function(error) {
		
	});
};

export const ajaxDelete = function(url, params, callback, err) {
	axios.delete(url, {
		params: params
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		if(err) {
			callback('error');
		}
	});
};

/**此方法只为登录使用**/
export const ajaxLogin = function(url, params, callback) {
	axios({
		method: 'post',
		url: url,
		data: Qs.stringify(params)
	}).then(function(res) {
		callback(res);
	}).catch(function(error) {
		callback(error);
	});
};

axios.defaults.timeout = 15000;

//请求拦截器
axios.interceptors.request.use(function(config) {
	//判断是不是登录接口，如果是登录接口 不需要token 继续请求；如果不是，阻止请求
	if(config.url.indexOf('login') > -1) {
		// config.url=prePath+config.url;
		//continue
	} else {
		if(getCookie('access_token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = getCookie('access_token');
		} else {
			return Promise.reject();
		}
	}
	if(showLogs === 1) {
		console.log("接口地址-->" + config.url);
		if(config.params) {
			console.log("传入参数-->" + JSON.stringify(config.params));
		} else {
			console.log("传入参数-->" + config.data);
		}
	}
	return config;
}, function(error) {
	return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(
	response => {
		if(showLogs === 1) {
			console.log("返回数据-->" + JSON.stringify(response.data));
		}
		if(response.config.url.indexOf('chackUser') > -1) {//如果是登录接口，不处理异常
		
		}else{
			var code = response.data.code;
			if(code && code !== 200) {
				if(code === 401) { //401 未登录
					delCookie('access_token');
					window.location.reload();
				} else {
					Message.error(response.data.msg);
				}
				return Promise.reject(response.data);
			}
		}
		return response.data;
	},
	error => {
		return Promise.reject(error)
	});