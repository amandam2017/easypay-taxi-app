create table taxi_owners(
    id serial not null primary key,
    name varchar,
    surname int,
    unique_code text,
    his_taxis text,
    drivers_name text,
);

create table taxi_trips(
    id serial not null primary key,
    reg_number varchar,
    route int,
    drivers_name text,
);