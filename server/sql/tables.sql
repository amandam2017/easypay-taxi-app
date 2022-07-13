create table users(
    id serial not null primary key,
    name text not null,
    surname text not null,
    username text not null,
    password text not null,
    role text default 'passengers/drivers/owner'
);

create table taxi_data(
    id serial not null primary key,
    reg_number varchar not null,
    qty int not null,
    owner_id int not null
);

create table drivers(
    id serial not null primary key,
    user_id int not null,
    foreign key(user_id) references users(id),
    taxi_id int not null,
    foreign key(taxi_id) references taxi_data(id)
);

-- create table routes(
--     id serial not null primary key,
--     depature text not null,
--     destination text not null
-- );

-- create table taxi_trips(
--     id serial not null primary key,
--     reg_number varchar not null,
--     destination text not null,
--     driver text not null,
--     foreign key(driver) references taxi_owners(drivers_name),
--     taxi_route text not null,
--     foreign key(taxi_route) references routes(depature, destination),
--     total_fare int not null,
--     card_payment int not null,
--     cash_payment int not null
-- );

-- create table vouchers(
--     id serial not null primary key,
--     cashback varchar not null
-- );




