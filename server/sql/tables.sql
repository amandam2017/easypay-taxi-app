create table passengers(
    id serial not null primary key,
    name text not null,
    surname text not null,
    username text not null,
    password text not null
);

create table taxi_driver(
    id serial not null primary key,
    name text not null,
    surname text not null,
    username text not null,
    password text not null,
    reg_number varchar not null,
    taxi_code varchar not null,
    foreign key(taxi_code) references taxi_owners(unique_code)
);

create table taxi_owners(
    id serial not null primary key,
    name text not null,
    surname text not null,
    username text not null,
    unique_code varchar not null,
    his_taxis varchar not null,
    drivers_name text not null,
    password text not null
);

create table taxi_trips(
    id serial not null primary key,
    reg_number varchar not null,
    route int,
    drivers_name text not null
);