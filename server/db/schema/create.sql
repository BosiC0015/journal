DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS plans CASCADE;

DROP TABLE IF EXISTS diaries CASCADE;

DROP TABLE IF EXISTS habits CASCADE;

DROP TABLE IF EXISTS january_habits CASCADE;


CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  intro Text
);

CREATE TABLE diaries(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content text,
  DATE TIMESTAMP NOT NULL
);

CREATE TABLE plans(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  descri text,
  TYPE VARCHAR(255) NOT NULL,
  scheduled_at TIMESTAMP NOT NULL
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL
);

CREATE TABLE january_habits (
  id SERIAL PRIMARY KEY NOT NULL,
  day INTEGER NOT NULL,
  habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false
);