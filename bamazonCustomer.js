var mysql = require("mysql");
var inquirer = require("inquirer");


// Create the Connection to the DB //
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

// Connect to SQL server and SQL DB
connection.connect(function(err){
    if (err) throw err;
    
    // run start function after connection is made to prompt user
    showProducts();
});

function showProducts() {
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;

        console.log('');
        console.log('-------------Current Inventory---------------');
        console.log('');
    
        
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + '      Product: ' + res[i].product + '      Department: ' + res[i].department);
            console.log('Price: ' + res[i].price + '      Quanity Left: ' + res[i].quanity);
            console.log(' ');
            console.log(' ');
        }
        
    })
}






// function to prompt user  on what they would like to do
function start(){
    inquirer
    .prompt({
        
    })
}