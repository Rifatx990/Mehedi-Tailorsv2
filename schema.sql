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
-- Workers table
CREATE TABLE workers (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  role TEXT,
  salary_type TEXT,
  salary_amount NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Worker assignments
CREATE TABLE worker_orders (
  id SERIAL PRIMARY KEY,
  worker_id INT REFERENCES workers(id),
  order_id INT REFERENCES orders(id),
  status TEXT DEFAULT 'assigned',
  completed_at TIMESTAMP
);
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  user_id INT REFERENCES users(id),
  type TEXT CHECK (type IN ('advance','payment','due','salary')),
  amount NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE,
  discount_type TEXT CHECK (discount_type IN ('fixed','percentage')),
  discount_value NUMERIC,
  max_usage INT,
  used_count INT DEFAULT 0,
  expires_at DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
