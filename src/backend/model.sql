create database if not exists kidsprog;

use kidsprog;

create table if not exists kidsprog.user (
    user_id int unsigned not null,
    username varchar(20) not null,
    password varchar(20) not null,
    role ENUM('A', 'U') not null DEFAULT 'U',
    create_time DATETIME not null,
    login_state ENUM('Y', 'N') not null,
    email varchar(45) null,
    phone int null,
    primary key (user_id),
    constraint SPK_SIGNUP Check (email is not null or phone is not null),
    UNIQUE INDEX UK_ID (user_id ASC) VISIBLE,
    UNIQUE INDEX UK_USERNAME (username ASC) VISIBLE
);

create table if not exists kidsprog.progress (
user_id int unsigned not null,
unlock_progress int not null,
finish_progress int not null,
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

insert into user values (1, 'cmy', '123456', 'U', NOW(), 'N', 'eqw2@', '110');
insert into user values (2, 'lbh', '12341234', 'U', NOW(), 'N', 'fbk@', '111');
