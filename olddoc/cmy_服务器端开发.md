这篇主要记录在探索如何在服务器后端开发的一个笔记：

### 实例

#### web应用：收藏夹系统

来源1：[mysql使用+python编写后端+postman调试工具](https://www.bilibili.com/video/av82591972/)

包含内容：

+ 涉及到的数据库包括了用户信息的数据库，可以借鉴；
+ 对后端接口的考虑和设置可以借鉴；
+ 展示了后端服务器和数据库连接的python代码，以及接口的实现
+ 展示了postman的基本使用方法

总结：

​	后端使用的是Flask和Python，与数据库连接

下面是他给出的教学用例（并非收藏夹系统：

```Python
import pymysql
from flask import Flask, request, jsonify
from flask_cors import CORS

# 数据库连接
# 开发过程中选择127.0.0.1或者localhost
db = pymysql.connect("127.0.0.1","root","123456","myfavorite")
cursor = db.cursor()
# 这样就完成了数据库的连接

# 后端服务启动，接收前端发送请求
app = Flask(__name__)
CORS = (app, resources=r'/*')

# 后端接口路径
@app.route('url', methods=['POST'])
def func():
  	if request.method == "POST":
      	username = request.from.get("username")
        print("收到用户名"+str(username))
        print("\n执行一些操作\n")
        return "返回给前端处理结果"

# 程序入口      
if __name__ == "__main__":
# 注意端口不要与已使用的相同。执行这一行后开始对8899端口监听而不会立即执行下面两行
		app.run(host="0.0.0.0", port=8899)
    db.close()
    print("Good Bye!")
```



来源2：[vue.js前端+前端与后端的连接](https://www.bilibili.com/video/BV1HJ411V7RB)

包含内容：

+ 相对于jsk的vue的高级教程
  + 简单展示了vue的router设置以及具体的功能，前端需要花时间在这一方面；
  + 设置后端地址的全局变量
+ 前端与后端之间的连接
  + 这一部分使用的是js中的函数向后端发送请求

### 教程

#### Flask

##### Flask安装

参考[网址](https://www.w3cschool.cn/flask/flask_environment.html)，这里不再赘述

##### Flask路由

个人认为是比较重要的一部分。

现代Web框架使用路由技术来帮助用户记住应用程序URL。可以直接访问所需的页面，而无需从主页导航。

Flask中的**route()**装饰器用于将URL绑定到函数。例如：

```Python
@app.route(‘/hello’)
def hello_world():
   return ‘hello world’
```

在这里，URL **'/ hello'** 规则绑定到**hello_world()**函数。 因此，如果用户访问**http：// localhost：5000 / hello** URL，**hello_world()**函数的输出将在浏览器中呈现。

application对象的**add_url_rule()**函数也可用于将URL与函数绑定，如上例所示，使用**route()**。

装饰器的目的也由以下表示：

```python
def hello_world():
   return ‘hello world’
app.add_url_rule(‘/’, ‘hello’, hello_world)
```

##### Flask变量规则

​	通过向规则参数添加变量部分，可以动态构建URL，此变量部分标记为<variable-name>。它作为关键字参数传递给与规则相关联的函数。

​	在以下示例中，root()装饰器的规则参数包含附加到URL`/hello`的<name>。因此，如果在浏览器中输入`http://localhost:5000/hello/w3cschool`作为URL，则`'w3cschool'`将作为参数提供给`hello()`函数。

#### Pymysql

来源：[菜鸟教程](https://www.runoob.com/python3/python3-mysql.html)

##### 数据库连接

连接数据库之前确认以下事项：

- 已经创建了数据库TESTDB；
- 在TESTDB数据库中已经创建了表 EMPLOYEE
- EMPLOYEE表字段为 FIRST_NAME, LAST_NAME, AGE, SEX 和 INCOME。
- 连接数据库TESTDB使用的用户名为 "testuser" ，密码为 "test123",你可以可以自己设定或者直接使用root用户名及其密码，Mysql数据库用户授权请使用Grant命令。
- 在你的机子上已经安装了 Python MySQLdb 模块。

实例：

```python
#!/usr/bin/python3

import pymysql

# 打开数据库连接
db = pymysql.connect("localhost","testuser","test123","TESTDB")

# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor() 

# 使用 execute() 方法执行SQL查询
cursor.execute("SELECT VERSION()")

# 使用 fetchone() 方法获取单条数据
data = cursor.fetchone()

print("Database version : %s" % data)

# 关闭数据连接
db.close()
```

##### 创建数据库表

如果数据库连接存在我们可以使用execute()方法来为数据库创建表，如下所示创建表EMPLOYEE：

```Python
#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","testuser","test123","TESTDB" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
 
# 使用 execute() 方法执行 SQL，如果表存在则删除
cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")
 
# 使用预处理语句创建表
sql = """CREATE TABLE EMPLOYEE (
         FIRST_NAME  CHAR(20) NOT NULL,
         LAST_NAME  CHAR(20),
         AGE INT,  
         SEX CHAR(1),
         INCOME FLOAT )"""
 
cursor.execute(sql)
 
# 关闭数据库连接
db.close()
```

##### 数据库插入操作

以下实例使用执行 SQL INSERT 语句向表 EMPLOYEE 插入记录：

```Python
#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","testuser","test123","TESTDB" )
 
# 使用cursor()方法获取操作游标 
cursor = db.cursor()
 
# SQL 插入语句
sql = """INSERT INTO EMPLOYEE(FIRST_NAME,
         LAST_NAME, AGE, SEX, INCOME)
         VALUES ('Mac', 'Mohan', 20, 'M', 2000)"""
try:
   # 执行sql语句
   cursor.execute(sql)
   # 提交到数据库执行
   db.commit()
except:
   # 如果发生错误则回滚
   db.rollback()
 
# 关闭数据库连接
db.close()
```

可以将插入语句修改成：

```Python
sql = "INSERT INTO EMPLOYEE(FIRST_NAME, \
       LAST_NAME, AGE, SEX, INCOME) \
       VALUES ('%s', '%s',  %s,  '%s',  %s)" % \
       ('Mac', 'Mohan', 20, 'M', 2000)
```

#####  数据库查询操作

Python查询Mysql使用fetchone()方法获取单条数据，使用fetchall()方法获取多条数据。

+ fetchone(): 该方法获取下一个查询结果集，结果集是一个对象
+ fetchall(): 接收全部的返回结果行
+ rowcount: 这是一个只读属性，并返回执行execute()方法后影响的行数。

查询EMPLOYEE表中salary（工资）字段大于1000的所有数据：

```Python
#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","testuser","test123","TESTDB" )
 
# 使用cursor()方法获取操作游标 
cursor = db.cursor()
 
# SQL 查询语句
sql = "SELECT * FROM EMPLOYEE \
       WHERE INCOME > %s" % (1000)
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 获取所有记录列表
   results = cursor.fetchall()
   for row in results:
      fname = row[0]
      lname = row[1]
      age = row[2]
      sex = row[3]
      income = row[4]
       # 打印结果
      print ("fname=%s,lname=%s,age=%s,sex=%s,income=%s" % \
             (fname, lname, age, sex, income ))
except:
   print ("Error: unable to fetch data")
 
# 关闭数据库连接
db.close()
```

##### 数据库更新操作

更新操作用于更新数据表的的数据，以下实例将 TESTDB 表中 SEX 为 'M' 的 AGE 字段递增 1：

```Python
#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","testuser","test123","TESTDB" )
 
# 使用cursor()方法获取操作游标 
cursor = db.cursor()
 
# SQL 更新语句
sql = "UPDATE EMPLOYEE SET AGE = AGE + 1 WHERE SEX = '%c'" % ('M')
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 提交到数据库执行
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()
 
# 关闭数据库连接
db.close()
```

##### 数据库删除操作

删除操作用于删除数据表中的数据，以下实例演示了删除数据表 EMPLOYEE 中 AGE 大于 20 的所有数据：

```Python
#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","testuser","test123","TESTDB" )
 
# 使用cursor()方法获取操作游标 
cursor = db.cursor()
 
# SQL 删除语句
sql = "DELETE FROM EMPLOYEE WHERE AGE > %s" % (20)
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 提交修改
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()
 
# 关闭连接
db.close()
```

##### 执行事务

事务机制可以确保数据一致性。

事务应该具有4个属性：原子性、一致性、隔离性、持久性。这四个属性通常称为ACID特性。

- 原子性（atomicity）。一个事务是一个不可分割的工作单位，事务中包括的诸操作要么都做，要么都不做。
- 一致性（consistency）。事务必须是使数据库从一个一致性状态变到另一个一致性状态。一致性与原子性是密切相关的。
- 隔离性（isolation）。一个事务的执行不能被其他事务干扰。即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
- 持久性（durability）。持续性也称永久性（permanence），指一个事务一旦提交，它对数据库中数据的改变就应该是永久性的。接下来的其他操作或故障不应该对其有任何影响。

Python DB API 2.0 的事务提供了两个方法 commit 或 rollback。

```python
# SQL删除记录语句
sql = "DELETE FROM EMPLOYEE WHERE AGE > %s" % (20)
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 向数据库提交
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()
```

对于支持事务的数据库， 在Python数据库编程中，当游标建立之时，就自动开始了一个隐形的数据库事务。

commit()方法游标的所有更新操作，rollback（）方法回滚当前游标的所有操作。每一个方法都开始了一个新的事务。

