const mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require("table");
var op1="View Product Sales by Department";
var op2 = "Create New Department";

var dbCon = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

dbCon.connect(function (err) {
    if (err) throw err;
    //This line to verify DB connection
    //console.log("connected as id " + dbCon.threadId + "\n");
    start();
});

function start() {
    console.log("==========================================================\n")
    inquirer.prompt(
        {
            name: "toDo",
            type: "list",
            message: "Select an option",
            choices: [op1, op2, "Exit"]
        }
    ).then(function (ans) {
        switch (ans.toDo) {
            case op1:
               viewSales();
                break;
            case op2:
                newDep();
                break;
            case "Exit":
               end();
                break;
        }
    });
}

function viewSales(){
    // SELECT  departments.department_id, products.department_name, departments.over_head_costs, SUM(product_sales), (SUM(product_sales)-departments.over_head_costs) AS profit
    // FROM products
    // INNER JOIN departments
    // ON departments.department_name = products.department_name
    // GROUP BY products.department_name;
var query = "SELECT  departments.department_id, products.department_name, " 
query += "departments.over_head_costs, SUM(product_sales) AS sales, "
query += "(SUM(product_sales)-departments.over_head_costs) AS profit ";
query += "FROM products ";
query += "INNER JOIN departments ";
query += "ON departments.department_name = products.department_name ";
query += "GROUP BY products.department_name";
   
dbCon.query(query, function (err, res) {
        if (err)
            throw err;
        console.log(res); 
        let data = [["id", "Department", "Costs", "Sales", "Profits"]];
        for (var i = 0; i < res.length; i++) {
            //create matrix with DB info
            data.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].sales, res[i].profit]);
        }
        // Table creation
        let config,
            output;
        config = {
            columns: {
                0: {
                    alignment: "left",
                    width: 5,
                },
                1: {
                    alignment: 'left',
                    width: 25,
                },
                2: {
                    alignment: 'left',
                    width: 12,
                },
                3: {
                    alignment: 'left',
                    width: 12,
                },
                4: {
                    alignment: "left",
                    width: 7,
                },
            },
        };
        output = table(data, config);
        console.log(output);
        //process.stdout.write(output);
        // End Table
        start();
    });



}



function end() {
    dbCon.end();
    console.log("==========================================================\n")
    console.log("Good bye");
}