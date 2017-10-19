var mysql = require("mysql");
var inquirer = require("inquirer");
var inStock = 0;
var totalPrice = 0;

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
        console.log('-------------Our current Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + '      Product: ' + res[i].product + '      Department: ' + res[i].department);
            console.log('Price: ' + res[i].price + '      Quanity Left: ' + res[i].quanity);
            console.log(' ');

        }
        //call function to start the user prompt for shopping//
        manageStore();
    });
}

//-----------------------------------------------------------//
// end of function to display items for sale on the console
//-----------------------------------------------------------//


//-----------------------------------------------------------//
// function to prompt user  on what they would like to do
//-----------------------------------------------------------//
function manageStore() {
    connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw console.log("connection error:" + err);
            inquirer
                .prompt([
                    {
                        name: 'selectId',
                        type: 'list',
                        message: 'Choose an option below to manage inventory:',
                        choices: ["Add inventory", "Add a new product", "Remove a product", "Quit"]


        }


            ]).then(function (answers) {
                    if (answers.selectId === "Add inventory") {
                        addInventory()
                    } else if (answers.selectId === "Add a new product") {
                        newProduct()
                    } else if (answers.selectId === "Remove a product") {
                        deleteProduct()
                    } else if (answers.selectId === "Quit") {
                        quit()
                    } else {
                        console.log("Please choose one of the options");
                    }
                });


            function addInventory() {
              inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the item number you wish to restock?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

                  ]).then(function(answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityAdded = answers.Quantity;
        var IDOfProduct = answers.ID;
        restockDatabase(IDOfProduct, quantityAdded);
    });
}; //end restockRequest

        function restockDatabase(id, quant) {
    //update the database
    connection.query('SELECT * FROM products WHERE id = ' + id, function(error, response) {
        if (error) { console.log(error) };
        connection.query('UPDATE products SET quanity = Quanity + ' + quant + ' WHERE id = ' + id);
        //re-run display to show updated results
        showProducts();
    });
}; //end restockDatabase

                //        
                //        var query = "SELECT * FROM products WHERE ?";
                //            connection.query(query, {
                //                id: answers.selectId
                //            }, function (err, res) {
                //
                //
                //                // get the information of the chosen item, set input to variables, pass variables as Parameters
                //
                //                var inStock = res[0].quanity;
                //                var itemBought = answers.amountBought;
                //
                //                if (inStock >= itemBought) {
                //                    var leftInStock = inStock - itemBought;
                //                    
                //                    ///  testing app to check values of variables /////
                //                    ///////////////////////////////////////////////////////////////////////////
                //                    
                ////                    
                ////                    console.log(leftInStock + "  amount left in stock ******");
                ////                    console.log(itemBought + "  amount bought");
                ////                    console.log(res[0].price + "   price");
                ////                    console.log(res[0].price * itemBought + "  total price of items bought");
                ////                    console.log(answers.selectId + "  checking id number");
                //                    
                //                    
                //                    ///////////////////////////////////////////////////////////////////////////
                //                    /// END testing app to check values of variables /////
                //                    
                //                    var totalPrice = res[0].price * itemBought;
                //                    var itemPurchased = res[0].product;
                //                    
                //                    console.log(totalPrice + "  total price of items bought");
                //                    
                //                    connection.query(
                //                        "UPDATE products SET ? WHERE ?", [
                //                            {
                //                                quanity: leftInStock
                //                                
                //                        },
                //                            {
                //                                id: answers.selectId
                //                        }
                //
                //                    ],
                //                        function (error) {
                ////                            console.log(price, amountBought);
                //                            if (error) throw err;
                //                            console.log("==============================================");
                //                            console.log("\n\r");
                //                            console.log("Order details:");
                //                            console.log("Item(s) purchased: " + itemPurchased);
                //                            console.log("Quanity purchased: " + itemBought + " @ $" + res[0].price);
                //                            console.log("Total Cost: $" + totalPrice);
                //                            console.log("\n\r");
                //                            console.log("Thank you for shopping at-fell off the truck online-");
                //                            console.log("==============================================");
                //                            showProducts();
                //
                //                        }
                //                    );
                //                } else {
                //                    console.log("==============================================");
                //                    console.log("\n\r");
                //                    console.log("Not enough available, please choose a different quantity");
                //                    console.log("\n\r");
                //                    console.log("==============================================");
                //                   showProducts();
                //
                //                }
                //
                //            });
                //        
                //        });// inquier.prompt
            });
    } // conection.query
