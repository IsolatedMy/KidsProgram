#-*-coding:utf-8 -*-

from flask import Flask, request, jsonify, make_response
import pymysql
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
import re

app = Flask(__name__)

# CORS
CORS(app,supports_credentials=True)
@app.after_request
def after_request(resp):
    resp = make_response(resp)
    resp.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8080'
    resp.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    resp.headers['Access-Control-Allow-Headers'] = 'content-type,token'
    return resp


# Http auth
auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username_token):
    username_token = request.headers.get('Token')
    if username_token == '':
        return False
    else:
        # check token valid :
        # currnet_user = user.verify_auth_token(username_token)
        # return currnet_user is not None
        return True

@auth.error_handler
def auth_error():
    return 'Invalid credentials'

'''
实现@auth.verify_password这个回调函数，
当被@auth.login_required修饰的视图函数被访问时，会先执行回调函数，
在回调函数中将获取http头部的token，
并验证该token是否合法，若合法则允许访问。
'''
'''
# 例子
@auth.login_required
@app.route('/creatpost',methods=['POST'])
def new_post():
    json = request.get_json()
    newpost = Post(title=json['title'],content=json['content'])
    db.session.add(newpost)
    db.session.commit()
    return "200 OK"
'''

def func(sql, m ='r'):
    # 本地使用时需要修改其中的'cmy'和'123456'为自己mysql中的用户和密码
    py = pymysql.connect('localhost', 'cmy', '123456', 'kidsprog', charset='utf8')
    cursor = py.cursor()
    print(sql)
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
        # token = user.generate_auth_token()
        # return token
        return username
    else:
        # return null
        return '<b>Login Failed</b>'

# 查询方法
@app.route('/user/query/', methods=['POST'])
def user_query():
    data = dict(request.form)
    

# 注册方法
@app.route('/user/register/', methods=["POST"])
def user_register():
    data = dict(request.form)
    username = data['username']
    check_sql = "select * from user where username = '{0}'".format(username)
    check = func(check_sql, 'r')
    print(check)
    if check:
        return '<script>alert("用户名已存在")</script>'
    
    p = r'([^@]+)@([^@]+)\.([^@]+)'
    email = data['email']
    if not email:
        return '<script>alert("邮箱不能为空")</script>'
    if re.search(p, email, re.M|re.I):
        orgnization = re.search(p, email, re.M|re.I).group(2)
        post = re.search(p, email, re.M|re.I).group(3)
        valid_mail = ['qq', '163', 'gmail', 'sina']
        if orgnization not in valid_mail or post != 'com':
            return '<script>alert("邮箱格式有误")</script>'
    else:
        return '<script>alert("邮箱格式有误")</script>'

    sql = "insert into user (username, password, role, create_time, login_state, email, phone)" \
         " values ('{username}','{password}','U', now(), 'N', '{email}','{phone}')".format (**data)
    res = func(sql,m='w')
    if res:
        return '<b>alert("添加成功")</b>'
    else:
        return '<b>alert("添加失败")</b>'

if __name__ == '__main__':
    app.run (debug=True, host='localhost', port='8000')
