# 维护接口
## app.py
***
1. after_request(resp)</br> 
需要flask将数据发送到前端，定义一个路由，访问该路由获取数据</br>
创建Response对象，设置数据并返回该对象</br>
2. verify_password(username_token)</br>
获取username_token，检测该token是否有效，返回TorF</br>
3. auth_error()</br>
4. func(sql, m ='r')</br>
输入为sql(sql语句）和m(操作)，连接并操作数据库，输出为data（结果值或集）</br>
5. user_login()</br>
登录方法，返回值为成功或失败标识</br>
6. user_register()</br>
注册方法，返回值为成功或失败标识</br>
