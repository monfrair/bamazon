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
        //call function to start the user prompt and shopping//
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
                name: 'quanity',
                type: 'input',
                message: 'How many would you like?'
            },
          
          ]).then(function (answers) {
                // get the information of the chosen item, set input to variables, pass variables as Parameters
                var quanityBought = answers.quanity;
                var itemBought = answers.selectId;

                boughtFromDB(quanityBought, itemBought);
          
        });
};
    //

              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              