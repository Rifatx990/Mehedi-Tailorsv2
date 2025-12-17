CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  order_type TEXT,
  status TEXT,
  delivery_date DATE
);

CREATE TABLE measurements (
  id SERIAL PRIMARY KEY,
  user_id INT,
  order_id INT,
  measurements_json JSONB,
  notes TEXT
);
