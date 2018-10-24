const mysql = require("mysql");
const config = require("./config.js");
const dbConfig = config.db;


const db = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database

}); 

module.exports = {
    db: db,

    init: function() {
        db.connect((err) => {
                if(err) {
                    throw err;
                }
                console.log("Successfully connected to database");

                // Create tables if they don't exist
                // TODO: Add username and account info for personal acocunt usage
                var expensesTable = "CREATE TABLE IF NOT EXISTS expenses (" +
                    "expenseId INTEGER AUTO_INCREMENT PRIMARY KEY, " +
                    "purchaseDate VARCHAR(12), " +
                    "cost DOUBLE, " +
                    "created VARCHAR(12), " +
                    "updated VARCHAR(12), " +
                    "categoryId INTEGER, " +
                    "merchantId INTEGER, " +
                    "comments VARCHAR(255) " + 
                    ")";
                
                var categoriesTable = "CREATE TABLE IF NOT EXISTS categories (" +
                    "categoryId INTEGER AUTO_INCREMENT PRIMARY KEY, " +
                    "name VARCHAR(255), " + 
                    "created VARCHAR(12), " + 
                    "updated VARCHAR(12), " +
                    "comments VARCHAR(255) " +
                    ")";

                db.query(expensesTable, function(err, result) {
                    if(err) {
                        throw err;
                    }
                    console.log("Expenses table");
                });

                db.query(categoriesTable, function(err, result) {
                    if(err) {
                        throw err;
                    }
                    console.log("Categories table");
                });
            });
        }
};
