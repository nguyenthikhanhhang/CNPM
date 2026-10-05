CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    role VARCHAR(20)
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10, 2)
);