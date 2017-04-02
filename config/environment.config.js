module.exports = {
	host: "0.0.0.0",
	port: "8888",
	mysql: {
		host: this.host,
		password: "123456",
		database: "crawler"
	},
	updateConfig: function (host, port) {
		this.host = host
		this.port = port
	}
}
