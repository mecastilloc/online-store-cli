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
    console.log("==========================================================\n")
    inquirer.prompt(
        {
            name: "toDo",
            type: "list",
            message: "Select an option",
            choices: [op1, op2, op3, op4, "Exit"]
        }
    ).then(function (ans) {
        switch (ans.toDo) {
            case op1:
                viewProd();
                setTimeout(start, 800);
                break;
            case op2:
                viewLow();
                //setTimeout(start, 1500);
                break;
            case op3:
                updateInv();
                break;
            case op4:
                addProd();
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
                    alignment: 'left',
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

function viewLow() {

    var query = "SELECT * from products WHERE stock_quantity < 5 ";
    dbCon.query(query,
        //     [
        //     { stock_quantity: 5 }
        // ], 
        function (err, res) {
            if (err) throw err;
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
            start();
        });

}

function updateInv() {
    viewProd();
    setTimeout(writeInv, 1500);
}

function writeInv() {
    console.log("==========================================================\n")
    inquirer.prompt([
        {
            name: "prodId",
            type: "input",
            message: "Type the Product id you want to update",
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
            message: "how many items do you want update?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (ans) {
        var q = parseInt(ans.q);
        //read stock
        var query = "SELECT * FROM  products WHERE ? "
        dbCon.query(query, [
            { id: ans.prodId }
        ], function (err, res) {
            if (err)
                throw err;
            console.log("==========================================================\n");
            console.log("Updating " + q + " of " + res[0].product_name);

            //Store new Values
            var newStock = res[0].stock_quantity + q;
            //update new value
            dbCon.query("UPDATE products SET ? WHERE?", [
                {
                    stock_quantity: newStock,
                },
                { id: ans.prodId }
            ], function (err) {
                if (err)
                    throw err;
                console.log("==========================================================\n")
                console.log("The New Stock of " + res[0].product_name + " is: " + newStock);
                start();
            });
        });
        
    });
}

function addProd(){
inquirer.prompt([
{
    name: "product",
    type: "input",
    message: "Type The Product Name",
},
{
name: "department",
    type: "input",
    message: "Type The Product's Department",
},
{
    name: "price",
        type: "input",
        message: "Type the  Product's price",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "stock",
            type: "input",
            message: "Type the Initial Stock",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
]).then(function(ans){
var price= parseFloat( ans.price)
var stock = parseInt(ans.stock);

var query = "INSERT INTO products SET ?";
    dbCon.query(query,[
        {
            product_name: ans.product,
            department_name: ans.department,
            price: price,
            stock_quantity: stock,
            product_sales: 0
        },
    ], function(err){
if(err) throw err;
console.log("==========================================================\n")
console.log("The product "+ ans.product + " has been added")
start();  
});


});


}