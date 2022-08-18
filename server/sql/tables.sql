-- 6. register everyone 
create table users(
    id serial not null primary key,
    name text not null,
    surname text not null,
    username text not null,
    password text not null,
    role text not null
);

-- 5.register taxi by owner
create table taxi_data(
    id serial not null primary key,
    reg_number varchar not null,
    qty int not null,
    owner_id int not null,
    foreign key(owner_id) references users(id)

);

-- 3. table for passenger count, the routes taken, reference taxi data and routes id for a given trip
create table taxi_trips(
    id serial not null primary key,
    route_id int not null,
    taxi_id int not null,
    passenger_count int not null,
    total_fare int not null,
    foreign key(taxi_id) references taxi_data(id),
    foreign key(route_id) references routes(id)
);

-- 1. table for getting drivers name, assign driver to taxi, 
create table drivers(
    id serial not null primary key,
    user_id int not null,
    taxi_id int not null,
    foreign key(user_id) references users(id),
    foreign key(taxi_id) references taxi_data(id)
);

-- 4.table for capture the information that will be visible for the passenger + routes for the dropdown
create table routes(
    id serial not null primary key,
    img text not null,
    taxi_id int not null,
    price int not null,
    departure text not null,
    destination text not null,
    foreign key(taxi_id) references taxi_data(id)
);

create table card_payment(
    id serial not null primary key,
    firstname text not null,
    card_number varchar not null,
    exp_month text not null,
    exp_year int not null,
    cvv int not null
);

-- 2. for passenger making payment to get receipt, references a taxi trip that passenger was in
create table payment_receipt(
    id serial not null primary key,
    user_id int not null,
    taxi_trip_id int not null,
    amount int not null default 0,
    payment_type text,
    foreign key(taxi_trip_id) references taxi_trips(id),
    foreign key(user_id) references users(id)
);




