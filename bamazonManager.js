const mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require("table");
const op1 = "View Products for Sale";
const op2 = "View Low Inventory";
const op3 = "Add to Inventory";
const op4 = "Add New Product";
// use your DB connection data
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
    inquirer.prompt(
        {
            name: "toDo",
            type: "list",
            message: "Select an option",
            choices: [op1, op2, op3, op4]
        }
    ).then(function (ans) {
        switch (ans.toDo) {
            case op1:
                viewProd();
                break;
            case op2:
                console.log("op2");
                break;
            case op3:
                console.log("op3");
                break;
            case op4:
                console.log("op4");
                break;
        }
    });
}

function viewProd() {
    var query = "SELECT * from products";
    dbCon.query(query, function (err, res) {
        if (err)
            throw err;
        //console.log(res); 
        let data = [["id", "Department", "Description", "Price", "Stock"]];
        for (var i = 0; i < res.length; i++) {
            //create matrix with DB info
            data.push([res[i].id, res[i].department_name, res[i].product_name, res[i].price, res[i].stock_quantity]);
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
                3: {
                    alignment: 'center',
                    width: 9,
                },
                4: {
                    alignment: "left",
                    width: 6,
                },
            },
        };
        output = table(data, config);
        console.log(output);
        //process.stdout.write(output);
        // End Table
    });
}