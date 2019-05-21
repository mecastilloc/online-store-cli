DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(15,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL (30,2) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(15,2) NOT NULL,
    PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 1000), 
		("Clothing", 800), 
		("Home", 500), 
        ("Sports", 700);

INSERT INTO products (product_name, department_name, price, stock_quantity,  product_sales)
VALUES ("Laptop PH Vavillion 356", "Electronics", 230.99, 10,4619.8),
		("SSD 1 TB AData", "Electronics", 110.40, 5,0),
        ("LED MONITOR 32in", "Electronics", 250.39, 6,0),
        ("Women T-Shirt Blue", "Clothing", 22.99, 15,344.85),
        ("Men T-Shirt", "Clothing", 24.55, 15,0),
        ("Unisex Leather Jacket", "Clothing", 150.67, 8,301.34),
        ("Bed Sheets", "Home", 30.99, 12,0),
        ("Bathroom Set", "Home", 45.85, 3,0),
        ("Kitchen Set", "Home", 52.99, 7,0),
        ("Baseball Glove", "Sports", 35.69, 6,356.9),
        ("Football NFL", "Sports", 42.92, 15,0),
        ("Soccer ball MLS", "Sports", 12.98, 20,129.8);