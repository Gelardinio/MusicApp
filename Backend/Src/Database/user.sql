create table user (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(40) NOT NULL,
	password VARCHAR(50) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(150),
	gender VARCHAR(70) NOT NULL,
	date_of_birth DATE NOT NULL,
	country VARCHAR(50)	
);
insert into user (first_name, last_name, email, gender, date_of_birth, country_of_birth) values ('Arni', 'Heake', 'aheake0@ftc.gov', 'Male', '4/2/2021', 'China');