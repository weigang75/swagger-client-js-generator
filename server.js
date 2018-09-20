function getIpAddr() { //获取IP
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
var express = require("express");
var browser = require('browser-sync');

var app = express();

app.use(express.static(".")).listen(7533,function() {
		browser({
			proxy: getIpAddr() + ':7533/generator.html',
			files: ['./'],
			port: 7533,
			ui: {
				port: 7533
			},
			open: true
		});
	});

