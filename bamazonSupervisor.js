const mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require("table");
var op1 = "View Store's Departments"
var op2 = "View Product Sales by Department";
var op3 = "Create New Department";

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
            choices: [op1, op2, op3, "Exit"]
        }
    ).then(function (ans) {
        switch (ans.toDo) {
            case op1:
                viewDep();
                setTimeout(start, 800);
                break;
            case op2:
                viewSales();
                break;
            case op3:
                addDep();
                break;
            case "Exit":
                end();
                break;
        }
    });
}

function viewDep(){
    var query = "SELECT * from departments";
    dbCon.query(query, function (err, res) {
        if (err)
            throw err;
        //console.log(res); 
        let data = [["id", "Department", "Over Head Costs"]];
        for (var i = 0; i < res.length; i++) {
            //create matrix with DB info
            data.push([res[i].department_id, res[i].department_name, res[i].over_head_costs]);
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
                    wrapWord: true
                },
                2: {
                    alignment: 'left',
                    width: 25,
                    wrapWord: true
                },
            },
        };
        output = table(data, config);
        console.log(output);
        //process.stdout.write(output);
        // End Table
    });
}

function viewSales() {
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
        //console.log(res);
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

function addDep() {
    viewDep();
    setTimeout(writeDep, 800);
}

function writeDep(){
    console.log("==========================================================\n")
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Type The New Department Name",
        },
        {
            name: "costs",
            type: "input",
            message: "Type the Department's Over Head Costs",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
    ]).then(function (ans) {
        var costs = parseFloat(ans.costs)
        var query = "INSERT INTO departments SET ?";
        dbCon.query(query, [
            {
                department_name: ans.department,
                over_head_costs: costs,
            },
        ], function (err) {
            if (err) throw err;
            console.log("==========================================================\n")
            console.log("The department " + ans.department + " has been added")
            start();
        });
    });
}

function end() {
    dbCon.end();
    console.log("==========================================================\n")
    console.log("Good bye");
}