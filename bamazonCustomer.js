var mysql = require("mysql");
var inquirer = require("inquirer");
var op1 = "";

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
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id + "||" +
                "Product: " + res[i].product_name + "||");
        }
        toDo();
    });

}

function toDo() {
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
        console.log("Purchasing " + ans.q + " of " + ans.prodId);
        //read stock
        dbCon.query("SELECT * FROM  products WHERE ? ",
            [{ id: ans.prodId }], function (err, res) {
                if(err)
                throw err;
                if(res[0].stock_quantity>ans.q){
                //Store new Values
                var newStock = res[0].stock_quantity - ans.q;
               var total = res[0].price*ans.q;
               var newTsale = res[0].product_sales + total;
                //update new values
                dbCon.query("UPDATE products SET ? WHERE?", [
                    { stock_quantity: newStock,
                    product_sales: newTsale },
                    { id: ans.prodId }], function (err) {
                        if (err)
                            throw err;
                        console.log("Your total for " + ans.q + " "+ res[0].product_name + " is: "+ total);
                        again();
                    
                    });
                }else{
                    console.log("Not enough stock, try again...");
                    again();
                }
               
            });

    });
}


function again (){
    inquirer.prompt({
name: "again",
type: "list",
message: "What Next?",
choices : ["By again", "Exit"]
    }).then (function(ans){
switch (ans.again) {
case "By again":
    showProd();
    break;

case "Exit":
    dbCon.end();
    console.log("Good bye");
    break;
}

    });
}