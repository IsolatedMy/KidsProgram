create database if not exists kidsprog;

use kidsprog;

create table if not exists kidsprog.user (
    user_id int unsigned not null AUTO_INCREMENT,
    username varchar(20) not null,
    password varchar(20) not null,
    role ENUM('A', 'U') not null DEFAULT 'U',
    create_time DATETIME not null,
    login_state ENUM('Y', 'N') not null,
    login_time DATETIME,
    token varchar(45),
    email varchar(45),
    phone int,
    level int unsigned not null DEFAULT 0,
    primary key (user_id),
    constraint SPK_SIGNUP Check (email is not null or phone is not null),
    UNIQUE INDEX UK_ID (user_id ASC) VISIBLE,
    UNIQUE INDEX UK_USERNAME (username ASC) VISIBLE
);

create table if not exists kidsprog.progress (
user_id int unsigned not null,
unlock_progress int not null,
primary key (user_id),
unique index uk_id (user_id ASC) visible,
constraint fk_user_id1 foreign key (user_id) 
references kidsprog.user(user_id) 
on delete no action
on update no action
); 

create table if not exists kidsprog.score (
user_id int unsigned not null,
level int null,
score enum('0', '2', '3') not null,
primary key (user_id),
unique index uk_id (user_id ASC) visible,
constraint fk_user_id2 foreign key (user_id) 
references kidsprog.user(user_id)
on delete no action
on update no action
);

insert into user 
(user_id, username, password, role, create_time, login_state, email, phone) 
values 
(1, 'cmy', '123456', 'U', NOW(), 'N', '1015547300@qq.com', '110');

insert into user 
(user_id, username, password, role, create_time, login_state, email, phone) 
values 
(2, 'lbh', '12341234', 'U', NOW(), 'N', 'lbh@sina.com', '111');
