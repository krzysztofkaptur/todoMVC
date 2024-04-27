-- +goose Up
create table users (
  id serial primary key,
  -- todo: demand longer string
  email varchar(50) unique not null,
  password varchar(200) not null
);

-- +goose Down
drop table users;