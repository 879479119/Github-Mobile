
function error(code=0, detail='') {
	return {
		code: 20000+code,
		message: "x_x",
		data: { detail }
	}
}

function databaseError(detail) {
	return {
		code: 21000,
		message: "something went wrong with database x_x",
		data: { detail }
	}
}

function networkError(detail) {
	return {
		code: 22000,
		message: "please check your network and retry later x_x",
		data: { detail }
	}
}

function uncaughtError(detail) {
	return {
		code: 23000,
		message: "some uncaught error occurred, connect 767444690@qq.com x_x",
		data: { detail }
	}
}

function argvError(detail) {
	return {
		code: 24000,
		message: "wrong format, please check your params x_x",
		data: { detail }
	}
}

function timeError(detail) {
	return {
		code: 25000,
		message: "timeout for some operation please retry later x_x",
		data: { detail }
	}
}

function authError(detail) {
	return {
		code: 26000,
		message: "unknown user, please login first x_x",
		data: { detail }
	}
}

function headerError(detail) {
	return {
		code: 27000,
		message: "header error, check your cookie x_x",
		data: { detail }
	}
}

function success(data, code=0) {
	return {
		code: 10000 + code,
		message: "operation success",
		data: data
	}
}

module.exports = {
	error,
	databaseError,
	networkError,
	uncaughtError,
	argvError,
	authError,
	timeError,
	headerError,
	success
}