# Online-store-cli


[Live Demo](https://youtu.be/byKOCnxJshw)

## Overview
It is an Amazon-like storefront with `MySQL` as database. The app will take in orders from customers and deplete stock from the store's inventory. Tracks product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.


To retrieve the data and proper functionality, It will need to use these Node packages.

   * [mysql](https://www.npmjs.com/package/mysql)

   * [inquirer](https://www.npmjs.com/package/inquirer)

   * [table](https://www.npmjs.com/package/table)


## Settings

1. Make sure you have installed Node.js as this app is base on It. Run **`node -v'** in the console and you will get the version installed, if nothing shows the install Node.js

 * [Node.js Install](https://nodejs.org/en/download/)


2. Set up a `MySQL` database connection to work with.           **_NOTE:_** There is a DUMP form the testing database if you want to use it instead.

      2.1 Use **`schema.sql`** file to create the Database Schema.

      2.2 Use **`seeds.sql`** file to set initial data.

      2.3  Update all three .js files **`bamazonCustomer, bamazonManager and bamazonSupervisor`** with your DB connection parameters:

```js
   var dbCon = mysql.createConnection({
    host: "your_host",
    port: connections_port_number,
    user: "your_user",
    password: "your_password",
    database: "bamazon"
});
```



3. Install all the dependencies needed with **`$npm install`**  Note that the file `package.json` already has what you need.


## Use Cases

Navigate to the app folder and there is three files: 

**`bamazonCustomer.js`** 

**`bamazonManager.js`**

**`bamazonSupervisor.js`**

### *Case 1 Customer View*

In the console run  **_`node bamazonCustomer.js`_**. Running this application will first display all of the items available for sale. Includes the ids, names, and prices of products for sale.

1. The app then prompt users with two input messages.

   * The first asks for the ID of the product the customer would like to buy.
   * The second message asks how many units of the product the customer would like to buy.

2. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase  `Not enough stock, try again...`, and then prevent the order from going through.
   * Prompts the user for `Buy again` or `Exit` the aplication.

3. If the store _does_ have enough of the product, It fulfills the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, shows the customer the total cost of their purchase.
   *The total cost is added to the product's product_sales column in the data base.
   * Prompts the user for `Buy again` or `Exit` the aplication.

### *Case 2 Manager View*

In the console run **_`node bamazonManager.js`_**. Running this application will:

  1. Lists a set of menu options:

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
    * Exit

  2. If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  3. If a manager selects `View Low Inventory`, then it  lists all items with an inventory count lower than five.

  4. If a manager selects `Add to Inventory`, the app first displays all the items available and then `input prompt` that will let the manager "add more stock" of any item currently in the datbase.

  5. If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store prompting for the information.

  6. If a manager selects `Exit`, it closes the data base connection and terminate the app.

### *Case 3 supervisor View*

In the console run **_`node bamazonSupervisor.js`_**. Running this application will list a set of menu options:

   * View Store's Departments
   * View Product Sales by Department
   * Create New Department
   * Exit

1. When a supervisor selects `View Store's Departments`, the app displays all the departments in the database with its ID's, Names and Over Head Costs

2. When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in their terminal/bash window like below:
---
        | id | Department   | Over Head Costs | Department's Sales | Profits  |
        | -- | ------------ | --------------- | ------------------ | -------- |
        | 01 | Electronics  | 10000           | 20000              | 10000    |
        | 02 | Clothing     | 60000           | 100000             | 40000    |
---

  * The `Department's Sales` column is the sum of all the `product's sales` grouped by `department name`. `Department's Sales` is not stored in any database.
  * The `Profits` column is calculated on the fly using the difference between `Over Head Costs` and `Department's Sales`. `Profits` is not stored in any database.
  * It uses this query to generate the new provisional columns:

```js
  var query = "SELECT  departments.department_id, products.department_name, "
    query += "departments.over_head_costs, SUM(product_sales) AS sales, "
    query += "(SUM(product_sales)-departments.over_head_costs) AS profit ";
    query += "FROM products ";
    query += "INNER JOIN departments ";
    query += "ON departments.department_name = products.department_name ";
    query += "GROUP BY products.department_name";
```
3. If a Supervisor selects `Create New Department`, it allows the supervisor to add a completely new department to the store prompting for the information.

4. If a Supervisor selects `Exit`, it closes the data base connection and terminate the app.


## COMMITS

**Commit 17: **
Dump of testing/demo database added with more data.

**Commit 16: **
Merge branch 'master' of https://github.com/mecastilloc/online-store-cli 

**Commit 15: **
Final `Readme` file update. Some code formatting.

**Commit 14: **
Delete sql files not needed.

**Commit 13: **
Supervisor view, add new department option added with database insert. Added view departments list option. Some code formatting in 3 .js files.

**Commit 12: **
Supervisor view, view sales  by department option completed.

**Commit 11: **
Manager view, add new product completed with database insert.

**Commit 10: **
Manager view, update product's stock completed with database update.

**Commit 9: **
Manager view, view Lower Stock with table completed.

**Commit 8: **
Manager view, view products completed with table.

**Commit 7: **
Render products data as a table added. Starting with selectable options in Manager view.

**Commit 6: ** 
Added function to type product id and quantity to purchase. Prints out total and refresh data base. `Readme` file update.

**Commit 5: **
Query to read products  Db table tested. missing fields to print out on console.

**Commit 4: **
Data base connection established successfully.

**Commit 3: **
`Package.json` file updated with inquirer and `MySQL` npm packages dependencies. `MySQL` Data Base initial scripts created.

**Commit 2: **
`Package.json` file created.

**Commit 1: **
Initial commit, repository created.