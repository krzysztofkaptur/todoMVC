-- +goose Up
create table if not exists todos (
  id serial primary key,
  text varchar(100) not null,
  completed boolean default false
);

-- +goose Down
drop table todos;
