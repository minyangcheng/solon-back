/*
建表脚本
*/
create table user(
	id int auto_increment primary key,
	userName varchar(100) not null comment '用户名',
	pwd varchar(100) not null comment '密码',
	createTime timestamp not null default CURRENT_TIMESTAMP comment '创建时间',
	modifyTime timestamp not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table app_update(
	id int auto_increment primary key,
	appKey varchar(50) not null comment '应用key:com.cg.gm',
	appType varchar(50) not null comment '应用类型:android/ios/weex',
    updateType int not null comment '更新类型:0不更新 1提示更新 2强制',
    packageUrl varchar(100) not null comment '包地址',
    version varchar(50) not null comment '版本号',
	createTime timestamp not null default CURRENT_TIMESTAMP comment '创建时间',
	modifyTime timestamp not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table images(
	id int auto_increment primary key,
	name varchar(100) not null comment '图片名称',
	url varchar(100) not null comment '图片地址',
    md5 varchar(32) not null comment '图片md5',
	createTime timestamp not null default CURRENT_TIMESTAMP comment '创建时间',
	modifyTime timestamp not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
mock数据脚本
*/
insert into app_update(appKey,appType,updateType,packageUrl,version) values(
'com.cg.b',
'android',
'1',
'http://www.baidu.com',
'1.0.0'
);
insert into app_update(appKey,appType,updateType,packageUrl,version) values(
'com.cg.b',
'android',
'1',
'http://www.baidu.com',
'1.0.1'
);
insert into app_update(appKey,appType,updateType,packageUrl,version) values(
'com.cg.b',
'android',
'1',
'http://www.baidu.com',
'1.0.2'
);
insert into app_update(appKey,appType,updateType,packageUrl,version) values(
'com.cg.b',
'android',
'1',
'http://www.baidu.com',
'1.0.3'
);

delete from app_update where appKey = '';
update app_update set version='2.0.1' where appKey='com.cg.b';
select * from app_update;

select * from app_update order by modifyTime desc , id desc LIMIT 2, 2;


