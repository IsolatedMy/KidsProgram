# 前后端说明

## 后端说明

### 注意事项

+ 修改`backend/app.py`中的`pymysql.connect`语句，将其中的cmy和123456修改成自己MySQL中的用户名和密码。之后执行python文件即可让后端开始运行。

+ 当前Falsk程序运行在localhost:8000下，前端发送消息请向这一端口发送信息。

### 端口

+ `\user\login\`
  + 发送数据：包含键值对'username'和'password' 
  + 功能： 根据输入的username和password在数据库中查找是否有对应元组，并根据查找结果返回一段字符串

### 数据库说明
当前决定的数据库包括如下若干
模块（目前暂不实现创意工坊模块）：

**1.身份信息表**

在登录模块和个人中心模块主要查询的表，id为主键，只有登录以后才能修改。

| 属性名 | 含义 | 数据类型 | 数据约束 |
|----|----|----|----|
|user_id|主键id|int|非空，主键，唯一|
|username|用户名|varchar(20)|唯一，非空|
|password|密码|varchar(20)|唯一，非空|
|role|权限（角色）|Enum('U','A')|默认为'U'，代表用户(user)权限；'A'代表管理员(Administrator)权限|
|create_time|创建时间|DATETIME|非空|
|login_state|登录状态|Enum('N', 'Y')|非空|
|email|电子邮箱|varchar(45)| |
|phone|电话号码|int| |

需要设置表约束或者触发器，使得email和电话号码不同时为空。

**2.进度表**

| 属性名 | 含义 | 数据类型 | 数据约束 |
|----|----|----|----|
|user_id|用户id|int|主键，非空，外键，唯一|
|unlock_progress|解锁进度|int|非空|
|finish_progress|完成进度|int|非空|

**3.关卡评分表**
|属性名|含义|数据类型|数据约束|
|----|----|----|----|
|user_id|用户id|int|主键，非空，外键，唯一|
|level|关卡|int||
|score|评分|待定| |

## 前端说明



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

