## 后端说明

### 运行

```mysql
# 首先在mysql中运行数据库
source model.sql
```

```sh
# 其次运行后端，为此先加载提供的虚拟环境
source venv/bin/activate

python3 app.py
```

此时，后端就运行在localhost:8000下。运行过程中不要关闭终端

### 注意事项

+ 修改`backend/app.py`中的`pymysql.connect`语句，将其中的cmy和123456（可能是其他值）修改成自己MySQL中的用户名和密码。之后执行python文件即可让后端开始运行。
+ 当前Falsk程序运行在localhost:8000下，前端发送消息请向这一端口发送信息。
+ 每次修改数据库的定义时，需要手动删除mysql中的数据库，并重新运行model.sql
+ 目前验证token的思路
	+ 首先，在登录时，前端发送`password`和`username`到后端。后端对`password`和当前时间组成的字符串进行md5加密生成`token`，将其返回前端，并**保存在后端**
	+ 前端需要访问内容时，将`token`放在请求头部。后端在数据库中查找后，确认用户对应元组，将其信息放回。
	+ 问题在于这里服务器端需要保存`token`，而我所了解到的`token`实现方式在后端是不需要保存的。目前查到的是考虑使用RSA加密算法，但是没空实现。

### 端口

+ `\user\login\`
  + 发送数据：包含键值对'username'和'password' 
  + 功能： 根据输入的username和password在数据库中查找是否有对应元组，并根据查找结果返回一段字符串
+ `\user\register\`
	+ 发送数据：需包含键值对'username', 'password', 'email'和'phone'
	+ 功能：注册新账户，即在数据库中添加新的用户
+ `\user\query\`
	+ 发送数据：无
	+ 功能：返回json格式对应登录用户表项
+ `\user\retrieve\`
	+ 发送数据
		+ `key`：可以是电话号码也可以是电子邮箱，通过格式进行辨别，并以此为特征对数据表进行修改
		+ `username`：用户名
		+ `password`：密码
	+ 返回数据
		+ 无
+ `\progress\send`
	+ 根据电子邮箱发送验证码
	+ 发送数据：
		+ `email`：电子邮箱，最好先在前端检查电子邮箱的格式
	+ 返回值：
		+ 无
+ `\progress\update`
	+ 更新用户通关情况
	+ 发送数据：
		+ `username`：用户名
		+ `progress`：当前通关关卡的下一关，用于更新`unlock_progress`属性值
	+ 返回值；
		+ 除了状态码300代表正常以外，其他均为错误

### 数据库说明
当前决定的数据库包括如下若干
模块（目前暂不实现创意工坊模块）：

**1.身份信息表**

在登录模块和个人中心模块主要查询的表，id为主键，只有登录以后才能修改。

| 属性名 | 含义 | 数据类型 | 数据约束 |
|----|----|----|----|
|user_id|主键id|int|非空，主键，唯一，自增|
|username|用户名|varchar(20)|唯一，非空|
|password|密码|varchar(20)|唯一，非空|
|role|权限（角色）|Enum('U','A')|默认为'U'，代表用户(user)权限；'A'代表管理员(Administrator)权限|
|create_time|创建时间|DATETIME|非空|
|login_state|登录状态|Enum('N', 'Y')|非空|
|login_time|登录时间|DATETIME||
|token|令牌，验证登录|Varchar(40)||
|email|电子邮箱|varchar(45)| |
|phone|电话号码|int| |

需要设置表约束或者触发器，使得email和电话号码不同时为空。

**2.进度表(progress)**

| 属性名 | 含义 | 数据类型 | 数据约束 |
|----|----|----|----|
|user_id|用户id|int|主键，非空，外键，唯一|
|unlock_progress|解锁进度|int|非空|
|||||

**3.关卡评分表**
|属性名|含义|数据类型|数据约束|
|----|----|----|----|
|user_id|用户id|int|主键，非空，外键，唯一|
|level|关卡|int||
|score|评分|待定| |

### 状态码

| 错误码 | 错误类型                             |
| ------ | ------------------------------------ |
| 200    | 注册成功                             |
| 201    | 无法在数据表中找到对应的username表项 |
| 202    | 电子邮箱和电话号码均为空             |
| 203    | 电子邮箱格式出现错误                 |
| 210    | 在往数据表插入新用户阶段出现了错误   |
| 300    | 更新关卡进度成功                     |
| 301    | 无法找到对应的username               |
| 302    |                                      |
|        |                                      |
|        |                                      |



## 问题集锦

**git提交后未能成功上传**

问题描述：在提交git时，某个文件夹尽管包含在`git add`的路径中，却不能够成功上传

解决方法：首先执行

```sh
git status
```

​	在未能提交的文件夹会出现这样一段提示信息（本例中是`frontend`文件夹）：

```
modified:   frontend (modified content, untracked content)
```

​	此时`frontend/`文件夹下有一个`.git`文件夹，删除后重新利用`git add`指令即可。

​	如果仍然未能够上传（这一点可以在`git commit`时通过输出信息判断），在`frontend`下执行下面的指令：

```
git rm --cached . -rf
```

​	从指令效果看，该指令将当前无法提交的文件夹删除，之后再重新利用`git add`添加到git中并提交。

## 参考

[1] [Haytham个人博客开发日志 -- Flask+Vue基于token的登录状态与路由管理](https://blog.csdn.net/chailie1504/article/details/100959645?utm_medium=distribute.pc_relevant.none-task-blog-baidulandingword-4&spm=1001.2101.3001.4242)

[2] [Vue项目中实现用户登录及token验证](https://www.cnblogs.com/web-record/p/9876916.html)

