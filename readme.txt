Swagger Api JavaScript 客户端代码生成器

[使用说明]
1. 把当前目录作为web发布(参考下面[发布方式])
   在浏览器中打开 generator.html 即可，比如 http://127.0.0.1:8080/generator.html;
2. 在打开的页面 generator.html 中，指定 ApiDoc 地址(默认为swagger.json样例文件);
3. 点击“开始生成”，下载2个文件
   ApiMethod.conf.generated.js 用于配置方法别名
   RestApi.generated.js  生成的 Api JavaScript 代码

[发布方式]
1. 默认使用 nodejs 发布
 1) npm install
 2) node server.js

2. 其他发布可以使用IIS、nginx、tomcat、apache

文件说明：
1. generator.html : 主页面文件
2. swagger.json   : Swagger Api Doc 
3. package.json server.js : nodejs 相关文件
4. start_server.bat ： 运行 node server.js


-------------------------------------
以下文字忽略
-------------------------------------
1. npm init
2. npm install express
3. node server.js
4. http://127.0.0.1:8080/generator.html