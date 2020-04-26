Django操作MySql详细教程
====
Django中每一个模型model都对应于数据库中的一张表，每个模型中的字段都对应于数据库表的列。<br>
方便的是，django可以自动生成这些create table, alter table, drop table的操作。其次Django为咱们也提供了后台管理模块(Django-Admin),主要功能是通过后台管理来实现客户端的功能，可以对数据进行增删改查。也可以通过该功能进行二次开发。<br>
[某教程](https://blog.csdn.net/weixin_43499626/article/details/84351572)<br>
要安装pymysql<br>
配置urls，浏览器访问<br>
[超超超详细的配置环境教程](https://www.liujiangblog.com/course/django/165)<br><br>
[配置+创建+操作](https://www.cnblogs.com/py-web/p/10906472.html)<br><br>
[超简易的django+mysql登录注册系统实现](https://www.cnblogs.com/ilovepython/p/11068885.html)<br><br>
[详细且功能丰富的登录注册系统（包含很多验证方式)](https://www.jianshu.com/p/4f84d0e0c8c9)<br><br>
[通过邮件找回密码](https://blog.csdn.net/qq_41682681/article/details/82748937)<br><br><br>
短信验证码，要买服务<br>
并不贵，不过应该不会按条卖。不上线的话可能可以开发这个功能，验证一下能不能成功就好了。测试软件尽量用密码登录。<br>
[短信验证码](https://blog.csdn.net/weixin_43958804/article/details/86292458)<br><br><br>
[django的异常分类](https://blog.csdn.net/brave_sun/article/details/76698648)<br>
[Django连接mysql时的常见错误](https://www.cnblogs.com/luozx207/p/10477103.html)<br>
[简易django支付宝接口](https://www.cnblogs.com/fanhua999/p/8215456.html)<br>
[简易django留言板](https://blog.csdn.net/qq_34262789/article/details/85246718)<br>
[Django排行榜（点击率）](https://blog.csdn.net/weixin_43692357/article/details/90446593)<br>
因为这次对数据库的调研本质上应该是对数据库mysql在Django和python下的学习，故我们在这里列出一些筛选后的教程，虽然具体串联还存在问题，但对后续开发的学习应该存在价值。<br>
<br><br><br>
我们这次针对我们的KidsProgram的后端开发其实非常接近于jpq数据库实验的lab3，在前后端共同开发的基础上操作mysql，且我们已经选择python作为我们的开发语言，所以做后端开发需建立在软工中django和python的学习还有数据库操作mysql的基础上，在具体开发过程中面向我们这次实验的要求，我们需要在django中使用到的各种例如对邮件找回还有支付方面的具体py代码实现，当然这一切都建立在配置环境的基础上，在教程中都有提到，至于在前后端接口这方面我们这次调研有略微涉及到html和django和mysql来实现简易的登陆注册系统，讲道理真的非常简易，所以细节方面可能需要在后续具体开发中共同学习，且复杂的实现也建立在对python的熟练使用上，至于包括短信验证码支付宝接口等功能则都是可供选择的选项。<br>
(其实这里非常建议jpq班的组员在写lab3的过程中提高姿势，获取经验，这样能非常有益于我组项目的开发（跑


  
