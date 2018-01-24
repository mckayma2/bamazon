var mysql = require('mysql');
var inquirer = require('inquirer');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Tango123"
//   database: "bamazon"
// });

function sqlConnect(q, type){
	// con.connect(function(err) {
	//   if (err) throw err;
	//   console.log("Connected!");
	//con.query(q, function (err, result) {
   // if (err) throw err;
   // console.log(type);
 // });
	//	con.end();
	// });
}

function options(){
  var options = [

  {
      type: 'list',
      name: 'userOption',
      message: 'menu options:',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    
    }

];

inquirer.prompt(options).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
		if(answers.userOption ==='View Products for Sale'){
			
			 productSale();
		}
		else if(answers.userOption ==='View Low Inventory'){

			 lowInv();
		}
		else if(answers.userOption ==='Add to Inventory'){
			 
			 addInv();
					}
		else if(answers.userOption ==='Add New Product'){

			addProd();
		};
});

};

function productSale(){
	var querytext;
	var querytype = 'Product data retrieved';
	sqlConnect(querytext, querytype);
};
function lowInv(){
	var querytext;
	var querytype = 'Low inventory data retrieved';
	sqlConnect(querytext, querytype);
};
function addInv(){
var addInv = [
		  {
		   type: 'input',
		   name: 'productId',
		   message: "Pease enter product id number"
		   },

		  {
		    type: 'input',
		    name: 'qty',
		    message: "Please enter quantity to add"
		  }
		];

		inquirer.prompt(addProd).then(answers => {
		  console.log(JSON.stringify(answers, null, '  '));
		var querytext;
		var querytype ='Item inventory updated';
		sqlConnect(querytext, querytype);
		});
	
};

function addProd(){
var addProd = [
		  {
		   type: 'input',
		   name: 'productName',
		   message: "Enter new product name"
		   }, 
		   {
		   type: 'input',
		   name: 'productCost',
		   message: "Enter unit price"
		   }, 
		    {
		   type: 'input',
		   name: 'productInventory',
		   message: "Enter Quantity in inventory"
		   } 
		];

		inquirer.prompt(addProd).then(answers => {
		  console.log(JSON.stringify(answers, null, '  '));
		var pn = answers.productName;
		var pc = answers.productCost;
		var pi = answers.productInventory;

		var querytext='INSERT INTO product (productName, productCost, productInventory) VALUES('
		querytext += pn;
		querytext += ",";
		querytext += pc;
		querytext += ",";
		querytext += pi;
		querytext += ")";

		var querytype ='Product added';
		sqlConnect(querytext, querytype);
		});
};

options();
	