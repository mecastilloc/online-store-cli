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
    return
}