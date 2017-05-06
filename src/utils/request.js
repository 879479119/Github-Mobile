export default function request (url, body) {
	let search = ''
	if(body === undefined){
		search = body
	}else if(body.constructor === Object){
		for(let attr in body){
			if(body.hasOwnProperty(attr)) search += attr + '=' + body[attr] + '&'
		}
	}else if(body.constructor === String){
		search = body
	}else{
		if(body) throw "You cannot serialize an array! wrap it in an object"
	}
	return fetch(url,{
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		credentials: 'include',
		body: search
	})
}

export function login() {
	return request('/user/login')
}