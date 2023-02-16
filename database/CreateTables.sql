create table if not exists rol (
	id SERIAL PRIMARY KEY,
	rol VARCHAR NOT NULL
);

create table if not exists users (
	identification_number integer primary key,
	name varchar,
	last_name varchar,
	gender varchar,
	rol_id integer, 
	constraint rolId foreign key (rol_id) references rol (id)
);

create table if not exists credentials(
	identification_number integer primary key,
	password varchar,
	constraint userId foreign key (identification_number) references Users (identification_number)
);

create table if not exists pet (
	id SERIAL PRIMARY KEY,
	name varchar,
	sex varchar,
	race varchar,
	user_id integer,
	constraint userId foreign key (user_id) references users (identification_number)
);

create table if not exists clinic_history(
	id SERIAL PRIMARY KEY,
	date date,
	hour time,
	pet_id integer,
	constraint petId foreign key (pet_id) references pet (id)
);

create table if not exists clinical_record(
	id SERIAL PRIMARY KEY,
	temperature float,
	heart_rate varchar,
	weight float,
	observation varchar,
	date date,
	hour time,
	employee_id integer,
	clinic_history_id integer,
	constraint employeeId foreign key (employee_id) references users (identification_number),
	constraint clinicHistoryId foreign key (clinic_history_id) references clinic_history (id)
);






