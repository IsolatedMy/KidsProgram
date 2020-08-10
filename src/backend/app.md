##维护   接口
###app.py
***
1. after_request(resp) 
需要flask将数据发送到前端，定义一个路由，访问该路由获取数据
创建Response对象，设置数据并返回该对象
2. verify_password(username_token)
获取username_token，检测该token是否有效，返回TorF
3. auth_error()
4. func(sql, m ='r')
输入为sql(sql语句）和m(操作)，连接并操作数据库，输出为data（结果值或集）
5. user_login()
登录方法，返回值为成功或失败标识
6. user_register()
注册方法，返回值为成功或失败标识
