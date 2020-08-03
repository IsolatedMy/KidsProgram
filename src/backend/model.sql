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

insert into user values (1, 'cmy', '123456', 'U', NOW(), 'N', 'eqw2@', '110');
insert into user values (2, 'lbh', '12341234', 'U', NOW(), 'N', 'fbk@', '111');
