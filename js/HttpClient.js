/** HttpClient */
function HttpClient() {
    this.request = function (method, url, model, success, fail) {
		if(success != null)
			if(typeof(success) !== "function"){
				throw new Error("parameter 'success' must be a function");
			}
		if(fail != null)
			if(typeof(fail) !== "function"){
				throw new Error("parameter 'fail' must be a function");
			}
        $.ajax({
            url: url,
            type: method,
            contentType: "application/json",
            dataType: "json",
            data: (model == null ? null : JSON.stringify(model)),
            success: function (callback) {
                if (success) {
					if(callback.code){
						if (callback.code == 1) {
							success(callback);
						} else {
							if (fail)
								fail(callback.message);
							else
								console.log(callback);
						}
					}else{
						success(callback);
					}
                }
            },
            error: function (err) {
                    if (err.status == 401) { //未登录
                        try { console.log(res.responseJSON.message) } catch (e) {};
                        setTimeout(function() {
                           // window.top.login();
                        }, 1000)
                    } else if (err.status == 502) {
                        console.log("网络联接失败,请检查您的网络");
                    } else if (err.status == 504) {
                        console.log("服务器超时，稍等请重试");
                    } else {
                        try { console.log(res.responseJSON.message) } catch (e) {};
                    }

                if (fail)
                    fail(err);
            }
        })
    }

    this.post = function (option) {
        this.request("POST", option.url, option.data, option.success, option.fail)
    };

    this.put = function (option) {
        this.request("PUT", option.url, option.data, option.success, option.fail)
    };

    this.get = function (option) {
        this.request("GET", option.url, null, option.success, option.fail)
    };

	this.del = function (option) {
        this.request("DELETE", option.url, null, option.success, option.fail)
    };
}

