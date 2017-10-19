var mysql = require("mysql");
var inquirer = require("inquirer");

//-----------------------------------------------------------//
// Create the Connection to the DB //
//-----------------------------------------------------------//
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",
    database: "bamazon_DB"
});

// Connect to SQL server and SQL DB
connection.connect(function (err) {
    if (err) throw err;

    // run start function after connection is made to prompt user
    showProducts();
});
//-----------------------------------------------------------//
// end Connection to the DB //
//-----------------------------------------------------------//



//-----------------------------------------------------------//
//function to display items for sale on the console
//-----------------------------------------------------------//
function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('-------------Current Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + '      Product: ' + res[i].product + '      Department: ' + res[i].department);
            console.log('Price: ' + res[i].price + '      Quanity Left: ' + res[i].quanity);
            console.log(' ');

        }
        //call function to start the user prompt for shopping//
        start();
    })
}

//-----------------------------------------------------------//
// end of function to display items for sale on the console
//-----------------------------------------------------------//


//-----------------------------------------------------------//
// function to prompt user  on what they would like to do
//-----------------------------------------------------------//
function start() {
    inquirer
        .prompt([
                {
                    name: 'selectId',
                    type: 'input',
                    message: 'Enter ITEM ID for product you wish to purchase:',

        },

                {
                    name: 'amountBought',
                    type: 'input',
                    message: 'How many would you like?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                   
                }
            ]).then (function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                selectId: answers.selectId
            }, function (err, res) {


                // get the information of the chosen item, set input to variables, pass variables as Parameters

                var inStock = res[0].quanity;
                var itemBought = answers.amountBought;

                if (inStock >= itemBought) {
                    var leftInStock = inStock - itemBought;

                    connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                quanity: leftInStock
                        },
                            {
                                selectId: answers.selectId
                        }

                    ],
                        function (error) {
                            if (error) throw err;
                            console.log("==============================================");
                            console.log("\n\r");
                            console.log("Order Details");
                            var totalPrice = res[0].price * answers.units;
                            console.log("Your Item(s) Cost: " + totalPrice);
                            console.log("\n\r");
                            console.log("==============================================");
                            showProducts();

                        }
                    );
                } else {
                    console.log("==============================================");
                    console.log("\n\r");
                    console.log("Not enough available, please choose a different quantity");
                    console.log("\n\r");
                    console.log("==============================================");
                   showProducts();

                }

            });
        
        });// inquier.prompt
    };// conection.query
