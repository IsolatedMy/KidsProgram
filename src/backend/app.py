from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

def func(sql, m ='r'):
    # 本地使用时需要修改其中的'cmy'和'123456'为自己mysql中的用户和密码
    py = pymysql.connect('localhost', 'cmy', '123456', 'kidsprog', charset='utf8');
    cursor = py.cursor()
    try:
        cursor.execute(sql)
        if m == 'r':
            data = cursor.fetchall()
        elif m == 'l':
            data = cursor.fetchone()
        elif m == 'w':
            py.commit()
            data = cursor.rowcount
    except:
        data = False
        py.rollback()
    py.close()
    return data

# 登录方法
@app.route('/user/login/', methods=["POST"])
def user_login():
    data = dict(request.form)
    username = data['username']
    sql = "select * from user where username = '{0}' ".format(username)
    res = func(sql, 'l')
    if res and res[2] == data['password']:
        return '<b>Login Suceess</b>'
    else:
        return '<b>Login Failed</b>'

# 注册方法
@app.route('/user/register/', methods=["POST"])
def user_register():
    data = dict(request.form)
    sql = "insert into children values ('{childusername}','{password}','{sex}','{age}','{childphone}')".format (**data)
    res = func(sql,m='w')
    if res:
        return '<script>alert("添加成功");location.href="/";</script>'
    else:
        return '<script>alert("添加失败");location.href="/";</script>'

if __name__ == '__main__':
    app.run (debug=True, host='localhost', port='8000')
