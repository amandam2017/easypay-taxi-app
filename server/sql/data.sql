insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '1',25.00, 'Stellenbosch', 'Cape Town');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '2',25.00, 'Stellenbosch', 'Cape Town');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '3',25.00, 'Kuilsriver', 'Cape Town');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '4',25.00, 'Stellenbosch', 'Kuilsriver');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '5', 25.00, 'Kuilsriver','Stellenbosch');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '6', 25.00, 'Stellenbosch', 'Kuilsriver');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '7', 23.50, 'Cape Town','Bellville');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '8', 23.50, 'Bellville', 'Cape Town');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '9', 23.50, 'Cape Town', 'Khayelitsha');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '10', 23.50, 'Bellville', 'Kuilsriver');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '11', 23.50, 'Stellenbosch', 'Khayelitsha');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '12', 20.00, 'Bellville', 'Khayelitsha');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '13', 23.50, 'Khayelitsha', 'Kuilsriver');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '14', 15.50, 'Kuilsriver', 'Mfuleni');
insert into routes (img, taxi_id, price, departure, destination) values ('taxi.png', '15', 15.50,  'Mfuleni','Kuilsriver');





insert into taxi_data (reg_number, qty, owner_id) values ('CA 456 653', 15, 1);
insert into taxi_data (reg_number, qty, owner_id) values ('CA 123 653', 15, 2);
insert into taxi_data (reg_number, qty, owner_id) values ('CL 123 123', 15, 3);
insert into taxi_data (reg_number, qty, owner_id) values ('CK 123 123', 15, 4);
insert into taxi_data (reg_number, qty, owner_id) values ('CJ 456 123', 15, 5);
insert into taxi_data (reg_number, qty, owner_id) values ('CL 789 123', 15, 1);
insert into taxi_data (reg_number, qty, owner_id) values ('CJ 345 456', 15, 2);
insert into taxi_data (reg_number, qty, owner_id) values ('CAA 000 123', 15, 3);
insert into taxi_data (reg_number, qty, owner_id) values ('CA 345 123', 15, 4);
insert into taxi_data (reg_number, qty, owner_id) values ('CK 453 123', 15, 5);
insert into taxi_data (reg_number, qty, owner_id) values ('CAA 789 876', 15, 1);
insert into taxi_data (reg_number, qty, owner_id) values ('CA 678 889', 15, 2);


insert into users (name, surname, username, password, role) values ('Thabo', 'Yona', 'Thabo', 'Thabo', 'Owner');
insert into users (name, surname, username, password, role) values ('Bonnie', 'Yona', 'Bonnie', 'Bonnie', 'Owner');
insert into users (name, surname, username, password, role) values ('Tshifi', 'Yona', 'Tshifi', 'Tshifi', 'Owner');
insert into users (name, surname, username, password, role) values ('Sino', 'Yona', 'Sino', 'Sino','Owner');
insert into users (name, surname, username, password, role) values ('Sinovuyo', 'Yona','Sinovuyo' ,'Sinovuyo', 'Owner');
insert into users (name, surname, username, password, role) values ('Vuyo', 'Yona', 'Vuyo', 'Vuyo','Driver');
insert into users (name, surname, username, password, role) values ('Makho', 'Yona', 'Makho',  'Makho','Driver');
insert into users (name, surname, username, password, role) values ('Unalo', 'Yona', 'Unalo', 'Unalo','Driver');
insert into users (name, surname, username, password, role) values ('Ongezwa', 'Yona', 'Ongezwa', 'Ongezwa','Driver');
insert into users (name, surname, username, password, role) values ('Gideon', 'Yona', 'Gideon', 'Gideon','Driver');
insert into users (name, surname, username, password, role) values ('Clara', 'Yona', 'Clara', 'Clara','Passenger');
insert into users (name, surname, username, password, role) values ('Xabiso', 'Yona', 'Xabiso', 'Xabiso','Passenger');
insert into users (name, surname, username, password, role) values ('Khosie', 'Yona', 'Khosie',  'Khosie','Passenger');
insert into users (name, surname, username, password, role) values ('Phumza', 'Yona', 'Phumza', 'Phumza', 'Passenger');
insert into users (name, surname, username, password, role) values ('Mpumi', 'Yona', 'Mpumi', 'Mpumi', 'Passenger');


insert into drivers (user_id, taxi_id) values (6, 1);
insert into drivers (user_id, taxi_id) values (7, 2);
insert into drivers (user_id, taxi_id) values (8, 3);
insert into drivers (user_id, taxi_id) values (9, 4);
