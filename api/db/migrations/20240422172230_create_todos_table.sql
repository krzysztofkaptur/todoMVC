-- +goose Up
create table if not exists todos (
  id serial primary key,
  text varchar(100) not null,
  completed boolean default false not null
);

-- +goose Down
drop table todos;
