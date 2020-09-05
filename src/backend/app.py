#-*-coding:utf-8 -*-

from flask import Flask, request, jsonify, make_response
import pymysql
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

import re
import time 
import hashlib
from sendEmail import sendMail

# 发送纯文本
import smtplib
# 发送标题
from email.header import Header
# 邮件正文
from email.mime.text import MIMEText
import random 

code = ''

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
def verify_password(auth_token):
    auth_token = request.headers.get('Token')
    print('Hello')
    if auth_token == '':
        return False
    else:
        sql = "select * from user where token = '{0}'".format(auth_token)
        res = func(sql, 'l')
        if res:
            return True
        else:
            return False

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
    try:
        cursor.execute(sql)
        print(sql)
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
        currentTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        sql = "update user set login_time = '{0}' where username='{1}'".format(currentTime, username)
        res = func(sql, 'w')
        token = hashlib.md5((str(username) + currentTime).encode()).hexdigest()
        sql = "update user set token = '{0}' where username='{1}'".format(token, username)
        res = func(sql, 'w')
        return token
    else:
        # return null
        return '<b>Login Failed</b>'

# 查询方法
@app.route('/user/query/', methods=['GET', 'POST'])
def user_query():
    data = request.headers.get('Token')
    sql = "select * from user where token = '{0}'".format(data)
    res = func(sql, 'l')
    if not res:
        return ''
    else:
        return jsonify(res)

# 查询等级
@app.route('/user/level/', methods=['GET', 'POST'])
def user_level():
    data = request.headers.get('Token')
    sql = "select * from user where token = '{0}'".format(data)
    res = func(sql, 'l')
    # 目前没有关卡信息
    response = {'username' : res[1], 'level' : 'null'}
    if not res:
        return ''
    else:
        return jsonify(response)
    
# 找回密码
@app.route('/user/retrieve/', methods=['POST'])
def user_retrieve():
    data = dict(request.form)
    username = data['username']
    password = data['password']
    p1 = r'([^@]+)@([^@]+)\.([^@]+)$'
    p2 = r'[0-9]+$'
    key = data['key']
    if not key:
        return '<script>alert("找回密码失败")</script>'
    ans1 = re.match(p1, key)
    ans2 = re.match(p2, key)
    if not ans1 and not ans2:
        return '<script>alert("找回密码失败")</script>'
    else:
        if ans1:
            sql = "update user set password = '{0}' where username = '{1}' and email = '{2}'".format(password, username, key)
        elif ans2:
            sql = "update user set password = '{0}' where username = '{1}' and phone = '{2}'".format(password, username, key)
        res = func(sql, 'w')
    return ''

# 注册方法
@app.route('/user/register/', methods=["POST"])
def user_register():
    data = dict(request.form)
    username = data['username']
    check_sql = "select * from user where username = '{0}'".format(username)
    check = func(check_sql, 'r')
    print(check)
    if check:
        return 'Code:201'
    
    p = r'([^@]+)@([^@]+)\.([^@]+)$'
    email = data['email']
    phone = data['phone']
    if not email and not phone:
        return 'Code:202'
    if email and re.search(p, email, re.M|re.I):
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
    sql = "insert into progress values ('{0}', 1)".format(username)
    res = func(sql,m='w')
    if res:
        return 'Code:200'
    else:
        return 'Code:210'

# 修改方法
@app.route('/user/modify/', methods=["POST"])
def user_modify():
    data = dict(request.form)
    
    p = r'([^@]+)@([^@]+)\.([^@]+)$'
    email = data['email']
    phone = data['phone']
    if not email and not phone:
        return 'Code:202'
    if email and re.search(p, email, re.M|re.I):
        orgnization = re.search(p, email, re.M|re.I).group(2)
        post = re.search(p, email, re.M|re.I).group(3)
        valid_mail = ['qq', '163', 'gmail', 'sina']
        if orgnization not in valid_mail or post != 'com':
            return '<script>alert("邮箱格式有误")</script>'
    else:
        return '<script>alert("邮箱格式有误")</script>'

    sql = "update user set password='{password}', email='{email}', phone='{phone}' where username= '{username}'".format (**data)
    res = func(sql,m='w')
    if res:
        return '<b>alert("修改成功")</b>'
    else:
        return 'Code:210'

@app.route('/progress/update/', methods=["POST"])
def progree_udpate():
    token = request.headers.get('Token')
    data = dict(request.form)
    sql = "select * from user where token = '{0}'".format(token)
    res = func(sql, 'l')
    if not res:
        return 'Code:302'
    user_id = res[0]
    progress = data['progress']
    sql = "select * from progress where user_id = {0}".format(user_id)
    res = func(sql, 'l')
    max_level = res[1]
    if int(max_level) > int(progress):
        return 'Code:301'
    sql = "update progress set unlock_progress = '{0}' where user_id = '{1}'".format(progress, user_id)
    res = func(sql, m="w")
    print(res)
    if res:
        return 'Code:300'
    else:
        return 'Code:301'

@app.route('/progress/query/', methods=["POST"])
def progress_query():
    token = request.headers.get('Token')
    sql = "select * from user where token = '{0}'".format(token)
    res = func(sql, 'l')
    user_id = res[0]
    sql = "select * from progress where user_id = '{0}'".format(user_id)
    res = func(sql, 'l')
    if res:
      return str(res[1])
    else:
      return 'Code:302'

@app.route('/user/send/',  methods=["POST"])
def user_send():
    data = dict(request.form)
    email = data['email']
    code = random.sample(list(range(9, 100)), 3)
    code = lsit(map(lambda x: str(x), code))
    code = ''.join(code)
    
    mail_user = "1015547300@qq.com"
    mail_pwd = "progywkwgdogbchd"
    mail_sender = "1015547300@qq.com"
    mail_receiver = email

    email_content = "您的验证码为：%s" % code 
    email_title = "少儿编程游戏"

    try:
        sendMail(mail_user, mail_pwd, mail_sender, mail_receiver, email_content, email_title)
        return 'Code:300'
    except:
        return 'Code:303'
    

if __name__ == '__main__':
    app.run (debug=True, host='localhost', port='8000')