# THIS FILE CONTAINS THE MYSQL QUERIES THAT WILL BE EXECUTED IN MYSQL DOCKER ON DB INITIALIZATION

### DEFAULT TABLES ###

# USERS TABLE
create table default_db.users(id int auto_increment, name varchar(13), primary key(id));
insert into default_db.users(name) values('gurgui'),('maria'),('charlot');

# TASKS TABLE
create table default_db.tasks(id int auto_increment, task varchar(40), primary key(id));
insert into default_db.tasks(task) values("Actualizar el Github"),("Echar currículums");

# CLIENTS TABLE
create table default_db.clients(name varchar(13), sname varchar(20));
insert into default_db.clients values('gurgui','gomez'),('maria','juana'),('pedro','pikapiedras');
