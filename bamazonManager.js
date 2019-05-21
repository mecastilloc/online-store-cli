const mysql = require("mysql");
const inquirer = require("inquirer");
const op1 = "View Products for Sale";
const op2 = "View Low Inventory";
const op3 = "Add to Inventory";
const op4 = "Add New Product";

start();


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
                console.log("op1");
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