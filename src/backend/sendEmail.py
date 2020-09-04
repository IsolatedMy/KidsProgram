# 发送纯文本
import smtplib
# 发送标题
from email.header import Header
# 邮件正文
from email.mime.text import MIMEText
import random 

code = random.sample(list(range(1, 101)), 3)
code = list(map(lambda x: str(x), code))
code = ''.join(code)

def sendMail(user, pwd, sender, receiver, content, title):
    """
    说明:
    """
    mail_host = "smtp.qq.com"
    message = MIMEText(content, "plain", "utf-8")
    message["From"] = sender
    message["To"] = ",".join(receiver)
    message["Subject"] = title

    try:
        smtpObj = smtplib.SMTP()
        smtpObj.connect(mail_host, 25)

        smtpObj.login(user, pwd)
        smtpObj.sendmail(user, receiver, message.as_string())
    except:
        print('邮件发送失败')
    

if __name__ == "__main__":
    mail_user = "1015547300@qq.com"
    mail_pwd = "progywkwgdogbchd"
    mail_sender = "1015547300@qq.com"
    mail_receiver = input("请输入收件人:")

    email_content = "您的验证码为: %s" % code
    email_title = "少儿编程游戏"

    sendMail(mail_user, mail_pwd, mail_sender,
        mail_receiver, email_content, email_title)

