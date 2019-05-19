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
