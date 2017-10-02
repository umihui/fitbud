DROP DATABASE IF EXISTS fitbud;

CREATE DATABASE fitbud;

USE fitbud;

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);


