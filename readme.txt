Swagger Api JavaScript �ͻ��˴���������

[ʹ��˵��]
1. �ѵ�ǰĿ¼��Ϊweb����(�ο�����[������ʽ])
   ��������д� generator.html ���ɣ����� http://127.0.0.1:8080/generator.html;
2. �ڴ򿪵�ҳ�� generator.html �У�ָ�� ApiDoc ��ַ(Ĭ��Ϊswagger.json�����ļ�);
3. �������ʼ���ɡ�������2���ļ�
   ApiMethod.conf.generated.js �������÷�������
   RestApi.generated.js  ���ɵ� Api JavaScript ����

[������ʽ]
1. Ĭ��ʹ�� nodejs ����
 1) npm install
 2) node server.js

2. ������������ʹ��IIS��nginx��tomcat��apache

�ļ�˵����
1. generator.html : ��ҳ���ļ�
2. swagger.json   : Swagger Api Doc 
3. package.json server.js : nodejs ����ļ�
4. start_server.bat �� ���� node server.js


-------------------------------------
�������ֺ���
-------------------------------------
1. npm init
2. npm install express
3. node server.js
4. http://127.0.0.1:8080/generator.html