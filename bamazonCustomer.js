var mysql = require("mysql");
var inquirer = require("inquirer");


// Create the Connection to the DB //
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    
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
        console.log('-------------------------');
        console.log('--------Items for sale----------');
        console.log('-------------------------');
        
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + 'Product Name: ' + res[i].product + 'Price: ' + res[i].price + 'Quanity Left: ' + res[i].quanity);
            console.log('-------------------------');
        }
        
    })
}






// function to prompt user  on what they would like to do
function start(){
    inquirer
    .prompt({
        
    })
}