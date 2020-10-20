CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    hash VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(60),
    is_admin BOOLEAN default false
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    total NUMERIC
);

CREATE TABLE order_item (
    order_item_id SERIAL PRIMARY KEY,
    product_key INTEGER REFERENCES product(product_id),
    order_id INTEGER REFERENCES orders(order_id),
    quantity INTEGER
);

