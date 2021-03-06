create table users(
    id serial not null primary key,
    name text not null,
    surname text not null,
    username text not null,
    password text not null,
    role text not null
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

create table routes(
    id serial not null primary key,
    img text not null,
    reg_number varchar not null,
    price int not null,
    departure text not null,
    destination text not null,
    count int not null,
    total_fare int not null,
    trips_taken int not null
);
create table card_payment(
    id serial not null primary key,
    firstname text not null,
    card_number varchar not null,
    exp_month text not null,
    exp_year int not null,
    cvv int not null
);
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




