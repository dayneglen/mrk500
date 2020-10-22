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
    shirt_id INTEGER REFERENCES shirt(shirt_id),
    order_id INTEGER REFERENCES orders(order_id),
    quantity INTEGER
);

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC,
    img_url VARCHAR(255),
    show_product BOOLEAN default true
);

CREATE TABLE product_size (
    product_size_id SERIAL PRIMARY KEY,
    size VARCHAR(20),
    tall BOOLEAN
);

CREATE TABLE shirt (
    shirt_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(product_id),
    product_size_id INTEGER REFERENCES product_size(product_size_id)
)
