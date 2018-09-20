String.prototype.replaceAll = function (FindText, RepText) {
    regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
 
  element.style.display = 'none';
  document.body.appendChild(element);
 
  element.click();
 
  document.body.removeChild(element);
}

// RestClient
var RestApi = new HttpClient();
var NoAliasesNameApiMethod = [];
/* 
 * 获取当前的 RestApi 的方法别名（在 ApiMethodAliases 中进行维护），
 * 
 */
var getFuncName = function(name,desc){
	if(!desc)desc="";
	if(ApiMethodAliases[name]){
		var aliases = ApiMethodAliases[name];
		NoAliasesNameApiMethod.push({name:name,aliases:aliases,desc:desc});
		return ApiMethodAliases[name];
	}
	NoAliasesNameApiMethod.push({name:name,aliases:name,desc:desc});
	
	return name;
};
/* 
 * 自动输出 RestApi 的方法别名映射代码（构建 ApiMethodAliases 映射），
 * 关注 “未命名” 开头的映射，建议全部指定别名。  
 */
var outputNewApiMethodAliases = function(){
	var apiAliase = {};
	var duplicatedApiAliase = [];

	coder.write("/* ApiMethod.conf.generated.js */");
	coder.line();

	coder.write("var ApiMethodAliases = {");
	coder.line();
	var idx = 0;
	for(var i in NoAliasesNameApiMethod){
		var item = NoAliasesNameApiMethod[i];
		coder.space(2);
		if(item.name == item.aliases){
			coder.write("/*无别名*/");
		}
		coder.write("\"",item.name,"\" : ","\"",item.aliases,"\"");
		if(idx < NoAliasesNameApiMethod.length - 1){
			coder.write(", ");
		}
		coder.write(" // ",item.desc);
		coder.line();
		idx++;
		if(apiAliase[item.aliases] == true){
			duplicatedApiAliase.push(item.aliases);
		}else{
			apiAliase[item.aliases]=true;
		}
	}
	coder.write("}");
	coder.line();
	// 检查防止 API 方法别名重复
	if(duplicatedApiAliase.length > 0){
		coder.write("API方法别名有重复的：");
		coder.line();
		for(var i in duplicatedApiAliase){
			coder.write(duplicatedApiAliase[i],"; ");
		}
	}
}
/* 
 * 获取当前的属性别名（在 VarNameAliases 中进行维护），
 * 
 */
var getVarName = function(name){
	if(VarNameAliases[name])
		return VarNameAliases[name];
	
	return name;	
};
 
/* 
 * 存储全局 VO 的定义
 * 
 */
var definitions = {

};
	//* 生成代码从这里开始
function startGenerate(swaggerDocUrl){
	RestApi.get({
		url: swaggerDocUrl,
		success:function(data){
			//console.log(data);
			// 获取到 Swagger Doc 后，生成代码
			generate(data);
		}
	});
}
// */

/*
 * 代码输出工具类
 */
var Coder = function(){
	this.strBuffer = "";
}

Coder.prototype.output = function(str){
	if(str == null)return;
	this.strBuffer += str;
	if(outputToBrowser){
		var outputStr = str.replaceAll(" ","&nbsp;").replaceAll("\n","<br/>");
		document.write(outputStr);
	}
}

Coder.prototype.clear = function(){
	this.strBuffer = "";
};
Coder.prototype.getStr = function(){
	return this.strBuffer;
};
/*
 * 代码输出工具类
 */
var coder = new Coder();
/*
 * 输出空格
 * @param count 输出空格个数
 */
Coder.prototype.space = function(count){
	if(count == null)
		count = 1;
	for(var i=0;i<count; i++)
		this.output("  ");
};
/*
 * 输出字符串
 * @param arguments 输出字符串
 */
Coder.prototype.write = function(){
	for(var i in arguments){
		this.output(arguments[i]);
	}
};
/*
 * 输出带引号的字符串
 * @param str 输出字符串
 */
Coder.prototype.writeStr = function(str){
	for(var i in arguments){
		this.output("\""+arguments[i]+"\"");
	}	
};
/*
 * 输出字符串，并追加一个回车换行
 * @param str 输出字符串
 * @param count 换行的个数
 */
Coder.prototype.writeLine = function(str,count){
	this.output(str);
	this.line(count);
};
/*
 * 输出回车换行
 * @param count 换行的个数
 */
Coder.prototype.line = function(count){
	if(count == null)
		count = 1;
	for(var i=0;i<count; i++)
		this.output("\n");
};


// var embedTypes = {};
/*
 * 用于输出模型的参数
 * @param spaceCount 输出空格的个数
 * @param model 模型
 * @param deep 递归调用的次数
 */
var outputModel = function(spaceCount, model, deep){
	if(!model)return;
	
	if(deep == null) // 默认递归次数为1
		deep = 1;
	else
		deep++; // 递归加一

	if(model["$ref"]){
		var modelType = model["$ref"].replace("#/definitions/","");
		/*
		if(embedTypes[modelType]){
			embedTypes[modelType]++;
		}else{
			embedTypes[modelType]=1;
		}*/
		model = definitions[modelType];
	}
	if(spaceCount == null) spaceCount = 1; // 默认输出空格 1 
	if(model){
		if(model.properties){
			// 遍历模型的属性
			for(var pi in model.properties){
				var property = model.properties[pi];
				coder.write(" * ");
				coder.space(spaceCount);
				var desc = property.description;
				if(!desc)desc="";
				var ty = property.type;
				if(!ty && property["$ref"]){
					ty = "json";
				}			
				// 如果属性类型是数组
				if(ty == "array"){
					// 如果属性类型是数组，一般情况下包含 property.items 属性
					if(property.items){
						// "$ref" 属性存放的是属性类型引用的对象定义（definitions 中包含）
						// deep < 3 主要是为了防止循环引用导致的内存溢出。
						if(property.items["$ref"] && deep < 3 ){
							//console.log(embedTypes[modelType],"embedTypes[modelType]");
							coder.write("- " + getVarName(pi) + " {" + ty + "} " + desc);
							coder.line();
							// 递归调用
							outputModel(spaceCount + 2, property.items, deep);
						}else{ // 其他条件下直接输出，不进行递归调用。
							var _ty = property.items.type;
							if(_ty == null)_ty = "";
							coder.write("- " + getVarName(pi) + " {" + ty + "[" + _ty + "]} " + desc);
							coder.line();
						}
					}
				}else{ // 如果属性类型为非数组类型，直接输出
					coder.write("- " + getVarName(pi) + " {" + ty + "} " + desc);coder.line();				
				}				
				
				if(property["$ref"] && deep < 3){
					//var p_schema = definitions[property["$ref"].replace("#/definitions/","")];
					// 递归调用
					outputModel(spaceCount + 2, property);
				}
			}
		}
	}
	/*
	if(embedTypes[modelType]){
		embedTypes[modelType]--;
	}*/
};
/*
 * 根据 uri 和 path 生成 API 代码。
 */
var generateApi = function(uri, path){
	// 支持的类型
	var methods = ["get","put","post","delete"];
	
	for(var m in methods){
		// Swagger 请求类型有：Body Path Query
		var urlPaths = []; // Swagger 请求类型 Path
		var urlQuerys = []; // Swagger 请求类型 Query
		// 获取是否存在 methods 支持的类型 的方法
		var method = path[methods[m]];		
		if(method){//  true表示 存在 methods 支持的类型 的方法
			//console.log(method);
			var schema = null; // 存放 Body（Swagger请求类型）的 schema
			if(method.parameters && method.parameters[0]){
				if(method.parameters.length > 0){
					// 遍历方法中的输入参数
					for(var pi in method.parameters){						
						if(method.parameters[pi].in == "path"){ // 如果是 Swagger 请求类型 Path
							urlPaths.push(method.parameters[pi]);
						}else if(method.parameters[pi].in == "query"){ // 如果是 Swagger 请求类型 Query
							urlQuerys.push(method.parameters[pi]);
						}else if(method.parameters[pi].in == "body"){ // 如果是 Swagger 请求类型 Body
							if(schema == null){
								// 一般情况只会有一个 Body
								schema = method.parameters[pi].schema;
								if(schema){
									// schema["$ref"] 不为空，说明是一个引用类型
									if(schema["$ref"] != null){
										schema = definitions[schema["$ref"].replace("#/definitions/","")];
										schema.type = "json";
									}else if((schema.type == "array" )&& (schema.items != null)){ // schema 是数组类型
										schema = definitions[schema.items["$ref"].replace("#/definitions/","")];
										schema.type = "array";
									}
									// Body 参数的描述
									schema.description = method.parameters[pi].description;
									// Body 是否为必需
									schema.required = method.parameters[pi].required;
								}
							}
						}
					}
				}
			}
			// 获取到 post get put delete
			var verb = methods[m];
			if(verb == "delete")
				verb = "del"; // del 
			// 获取方法的功能说明 
			var summary = path[methods[m]].summary;
			coder.line();
			// ----- 输出注释开始 -----
			coder.writeLine("/**");

			coder.writeLine(" * " + summary);
			
			if(urlPaths.length > 0){
				for(var i in urlPaths){
					var pp = urlPaths[i];
					coder.writeLine(" * @param {string} " + getVarName(pp.name) + " " + pp.description);
				}
			}
			
			if(urlQuerys.length > 0){
				for(var i in urlQuerys){
					var pp = urlQuerys[i];
					coder.writeLine(" * @param {string} " + getVarName(pp.name) + " " + pp.description);
				}
			}

			if(schema){
				if(!schema.description)schema.description="";
				var required = (schema.required==true?"(*必需) ":"");
			
				coder.writeLine(" * @param {" + schema.type + "} data " + required + schema.description);
				outputModel(3,schema);
			}
			coder.writeLine(" * @param {function} success 成功回调处理函数");
			coder.writeLine(" * @param {function} fail 失败回调处理函数");
			
			if(method.responses){
				var respOk = method.responses["200"];
				var resp_schema = null;
				if(respOk)
					resp_schema = respOk.schema;
				if(resp_schema){
					coder.writeLine(" * @return {json} 回调返回的数据");
					if(resp_schema["$ref"]){
						//resp_schema = definitions[resp_schema["$ref"].replace("#/definitions/","")];						
						outputModel(3,resp_schema);
					}
				}
			}		
		
			coder.writeLine(" */");	
			// ----- 输出注释结束 -----
			

			// ----- 输出Api函数代码开始 -----			
			coder.write(SwaggerApiName + "." + getFuncName(method.operationId,summary) + " = function(");
			// 输出 Path 类型的参数
			if(urlPaths.length > 0){
				for(var i in urlPaths){
					var pp = urlPaths[i];
					coder.write(getVarName(pp.name) + ", ");
				}
			}
			// 输出 Query 类型的参数
			if(urlQuerys.length > 0){
				for(var i in urlQuerys){
					var pp = urlQuerys[i];
					coder.write(getVarName(pp.name) + ", ");
				}
			}
			// 输出 Body 类型的参数
			if((verb == "post" || verb == "put") && schema){
				coder.write("data, ");
			}
			coder.write("success, fail){");coder.line();
			
			// 对 Query 类型的为空的参数 赋值为 空字符串
			if(urlQuerys.length > 0){
				for(var i in urlQuerys){
					var pp = urlQuerys[i];
					coder.space(2);coder.write("if(",getVarName(pp.name)," == null) ",getVarName(pp.name)," = \"\";");coder.line();
				}
				coder.line();
			}
			
			coder.space(2);coder.write(SwaggerApiName + "." + verb + "({");coder.line();
			
			var url = uri;
			// 通过 Path 类型的参数 对 Url 进行处理。
			// 比如："query/{p1}/{p2}/exec" 处理后为 "query/"+p1+"/"+p2+"/exec";
			if(urlPaths.length > 0){
				for(var i in urlPaths){
					var pp = urlPaths[i];
					url = url.replace("{"+pp.name+"}","\" + "+getVarName(pp.name)+" + \"");
				}
			}
			// 通过 Query 类型的参数 对 Url 进行处理。
			// 比如："query/exec" 处理后为 "query/exec?q1="+q1+"&q2="+q2
			if(urlQuerys.length > 0){
				url += "?";
				var idx = 0;
				for(var i in urlQuerys){
					var qp = urlQuerys[i];
					url += qp.name + "=\" + " + getVarName(qp.name) + " + \"";
					idx++;
					if(idx < urlQuerys.length)
						url += "&";
				}
			}
			// 输出 url 参数
			coder.space(4);coder.write("url : ",SwaggerApiName,".basePath + ","\"",url,"\"",",");coder.line();
			
			// 只有 post put 的方式才会存在 data 参数，当然 schema 为空也说明不存在 data 参数
			if((verb == "post" || verb == "put") && schema){
				coder.space(4);coder.write("data : data,");coder.line();
			}
			
			// 输出回调的2个参数（成功和失败）
			coder.space(4);coder.write("success : success",",");coder.line();
			coder.space(4);coder.write("fail : fail");coder.line();
			//coder.writeStr(uri);
			
			coder.space(2);coder.write("});");coder.line();

			coder.write("}");coder.line();
			
			// ----- 输出Api函数代码结束 -----	
		}
	}
};

/*
 * 根据 Swagger Doc 生成代码。
 * @param doc  Swagger Doc
 * @param init 是否加上初始化的代码，如果有多个 Swagger Doc 需要生成，第一次 init 为 true，其他为 false。
 */
var generate = function(doc, init){
	RestApi.basePath = doc.basePath;
	
	if(init == null)
		init = true;
	if(init){
		coder.write("/* RestApi.generated.js */");
		coder.line();
		
		coder.write("var " + SwaggerApiName + " = new HttpClient();");
		coder.line();
		coder.write(SwaggerApiName,".host=","\"",doc.host,"\"");	
		coder.line();
		coder.write(SwaggerApiName,".basePath=","\"",doc.basePath,"\"");	
		coder.line();
	}

	var methods = ["get","put","post","delete"];
	definitions = doc.definitions;

	for(var uri in doc.paths){
		var path = doc.paths[uri];
		//if(uri == "/deliver/lack-register")
			generateApi(uri,path);
	}
	var outputStr = coder.getStr();
	download("RestApi.generated.js",outputStr);
	
	coder.line(2);	
		
	coder.clear();
	// 最后，自动输出 RestApi 的方法别名映射代码（构建 ApiMethodAliases 映射）
	outputNewApiMethodAliases();
	
	var outputStr = coder.getStr();
	download("ApiMethod.conf.generated.js",outputStr);	
}