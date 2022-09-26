/*mysql 5 버전*/
grant all privileges on *.* to 'angel'@'%' identified by '1234' with grant option;

/*mysql 8 버전*/
create user 'angel'@'%'identified by '1234';
grant all privileges on *.* to 'angel'@'%'

create table member(
	num smallint auto_increment primary key,
	name varchar(20),
	id varchar(20),
	pass varchar(20),
	hp varchar(20),
	email varchar(50),
	addr varchar(300),
	gaipday datetime
);
select * from `member` m ;
select count(*) from member where id='angel111';
delete from member where num = 1;

--답변형 게시판

--num   시퀀스
--id  아이디
--subject  제목
--content 내용
--photos  이미지들(컴마로 저장)-no
--writeday  글쓴날짜(기본값 현재날짜시간)
--readcount 조횟수(기본값 0)
--chu  추천수(기본값 0)
--totalchu 총추천수(디폴트 0)  
--reg  그룹번호
--restep 그룹내 순서
--relevel 그룹내 들여쓰기 순서
create table reboard(
	num smallint auto_increment primary key,
	id varchar(30),
	subject varchar(1000),
	content varchar(3000),
	photos varchar(1000),
	writeday datetime,
	readcount smallint default 0,
	chu smallint default 0,
	totalchu smallint default 0,
	reg smallint,
	restep smallint,
	relevel smallint
);

select ifnull(max(num), 0) num from reboard;

select * from reboard order by num desc limit 0, 1;

create table answer (
	idx smallint auto_increment primary key,
	num smallint references reboard(num) on delete cascade,
	name varchar(20),
	id varchar(20),
	message varchar(1000),
	writeday datetime
);

drop table shop;
create table shop (
	num smallint auto_increment primary key,
	sangpum varchar(50),
	color varchar(20),
	price int,
	subject varchar(1000),
	content varchar(3000),
	ipgoday varchar(20)
);


-- 리액트 스키마
drop table shop;
create table shop (
	num smallint primary key auto_increment,
	sangpum varchar(100),
	photo varchar(200),
	su smallint,
	dan int,
	ipgoday datetime
);

create table memo (
   num smallint primary key auto_increment,
   nickname varchar(30),
   message varchar(1000),
   writeday datetime
);

create table reactboard(
	num smallint primary key auto_increment,
	id varchar(20),
	name varchar(20),
	photo varchar(100),
	subject varchar(500),
	content varchar(1000),
	readcount smallint default 0,
	writeday datetime
);














