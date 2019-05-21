const mysql = require("mysql");
const inquirer = require("inquirer");
const { table } = require("table");

// var op1 = "";

// use your DB connection data
var dbCon = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});


dbCon.connect(function (err) {
    if (err)
        throw err;
    //This line to verify DB connection
    //console.log("connected as id " + dbCon.threadId + "\n");
    showProd();

});


function showProd() {
    var query = "SELECT * from products";
    dbCon.query(query, function (err, res) {
        if (err)
            throw err;
        //console.log(res); 
        let data = [["id", "Description", "Price"]];
        for (var i = 0; i < res.length; i++) {
            //create matrix with DB info
            data.push([res[i].id, res[i].product_name, res[i].price]);
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
                    alignment: 'center',
                    width: 9,
                }
            },
        };

        output = table(data, config);
        console.log(output);
        //process.stdout.write(output);
        // End Table
        toDo();
    });
}

function toDo() {
    console.log("==========================================================\n");
    inquirer.prompt([
        {
            name: "prodId",
            type: "input",
            message: "Type the Product id you want to purchase",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "q",
            type: "input",
            message: "how many items do you want?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (ans) {
        
        
        //read stock
        dbCon.query("SELECT * FROM  products WHERE ? ",
            [{ id: ans.prodId }], function (err, res) {
                if (err)
                    throw err;
                    console.log("==========================================================\n");
                    console.log("Purchasing " + ans.q + " of " + res[0].product_name);
                if (res[0].stock_quantity >= ans.q) {
                    //Store new Values
                    var newStock = res[0].stock_quantity - ans.q;
                    var total = res[0].price * ans.q;
                    var newTsale = res[0].product_sales + total;
                    //update new values
                    dbCon.query("UPDATE products SET ? WHERE?", [
                        {
                            stock_quantity: newStock,
                            product_sales: newTsale
                        },
                        { id: ans.prodId }], function (err) {
                            if (err)
                                throw err;
                                console.log("==========================================================\n")
                                console.log("Your total for " + ans.q + " " + res[0].product_name + " is: " + total);

                                again();

                        });
                } else {
                    console.log("==========================================================\n")
                    console.log("Not enough stock, try again...");
                    again();
                }

            });

    });
}


function again() {
    console.log("==========================================================\n");
    inquirer.prompt({
        name: "again",
        type: "list",
        message: "What Next?",
        choices: ["By again", "Exit"]
    }).then(function (ans) {
        switch (ans.again) {
            case "By again":
                showProd();
                break;

            case "Exit":
                end();
                break;
        }

    });
}

function end() {
    dbCon.end();
    console.log("==========================================================\n")
    console.log("Good bye");
}