var mysql = require('mysql');
var inquirer = require('inquirer');

var sq = {
	con: mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Player1#",
		database: "bamazon"

		})
	};

var bamazonLibrary ={


		sqlConnect: function (q, type){
		sq.con.connect(function(err) {
		  if (err) throw err;
		  console.log("Connected!");
		  sq.con.query(q, function (err, result) {
		  if (err) throw err;
		  console.log(type);
		  console.log(result);
		  });
			sq.con.end();
		  })

		},

			options:function (){
			  var options = [
			  {
			      type: 'list',
			      name: 'userOption',
			      message: 'menu options:',
			      choices: ['View Products for Sale', 'Purchase', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			    
			    }

			];

			inquirer.prompt(options).then(answers => {
			  console.log(JSON.stringify(answers, null, '  '));
					if(answers.userOption ==='View Products for Sale'){
						
						this.productSale();
					}
					else if(answers.userOption ==='Purchase'){

						 this.purchase();
					}
					else if(answers.userOption ==='View Low Inventory'){

						 this.lowInv();
					}
					else if(answers.userOption ==='Add to Inventory'){
						 
						 this.addInv();
					}
					else if(answers.userOption ==='Add New Product'){

						this.addProd();
					};
			});

			},

			customerOptions:function (){
			  var options = [
			  {
			      type: 'list',
			      name: 'userOption',
			      message: 'menu options:',
			      choices: ['View Products for Sale', 'Purchase'],
			    
			    }

			];

			inquirer.prompt(options).then(answers => {
			  console.log(JSON.stringify(answers, null, '  '));
					if(answers.userOption ==='View Products for Sale'){
						
						this.productSale();
					}
					else if(answers.userOption ==='Purchase'){

						 this.purchase();
					}
					
			});

			},

			supervisorOptions:function (){
			  var options = [
			  {
			      type: 'list',
			      name: 'userOption',
			      message: 'menu options:',
			      choices: ['View Product Sales by Department', 'Create New Department'],
			    
			    }

			];

			inquirer.prompt(options).then(answers => {
			  console.log(JSON.stringify(answers, null, '  '));
					if(answers.userOption ==='View Product Sales by Department'){
						
						this.productSaleByDept();
					}
					else if(answers.userOption ==='Create New Department'){

						 this.newDept();
					}
					
			});

			},
			productSaleByDept: function (){
				var querytext= 'select departments.department_name, sum(product_sales), sum(costTotal)as Over_head_Cost, sum(product_sales - costTotal) as Profit from product inner join departments on product.depId = departments.department_id group by department_name;';
				var querytype = 'Product data retrieved';
				this.sqlConnect(querytext, querytype);

			},
			newDept: function (){
				// var querytext= 'SELECT * FROM product';
				// var querytype = 'Product data retrieved';
				// this.sqlConnect(querytext, querytype);

			},

			productSale: function (){
				var querytext= 'SELECT * FROM product';
				var querytype = 'Product data retrieved';
				this.sqlConnect(querytext, querytype);

			},

			purchase: function (){
			var purchase = [
					  {
					   type: 'input',
					   name: 'productId',
					   message: "Please enter product id number"
					   },

					  {
					    type: 'input',
					    name: 'qty',
					    message: "Please enter qty required"
					  }
					];

					inquirer.prompt(purchase).then(answers => {
					  console.log(JSON.stringify(answers, null, '  '));
					
					
					var pid = answers.productId;
					var pi = answers.qty;
					var querytext='UPDATE product SET productInventory = productInventory -';
					querytext += pi;
					querytext += ' WHERE productId =';
					querytext += pid;
					querytext += '; ';
					var querytype ='Purchase completed';
					//console.log(querytext);
					this.sqlConnect(querytext, querytype);
					this.purchaseSummary(pi, pid);
					this.update_product_sales(pi, pid);
					this.update_product_cost(pi, pid);
					});

			},

			purchaseSummary: function (qty, id){
					

					var querytext ='SELECT productCost * ';
					querytext += qty;
					querytext +=' FROM product WHERE productId =';
					querytext += id;
					querytext += '; ';
					var querytype ='Purchase Summary';
					 sq.con.query(querytext, function (err, result) {
			  		if (err) throw err;
			  		 console.log(querytype);
			  		console.log(JSON.stringify(result, null, '  '));
			  		});
				
					},

			update_product_sales:function (qty, id){
					

					var querytext ='UPDATE product SET product_sales = (productCost * ';
					querytext += qty;
					querytext +=') + product_sales WHERE productId =';
					querytext += id;
					querytext += '; ';
					var querytype ='Purchase Summary';
					 sq.con.query(querytext, function (err, result) {
			  		if (err) throw err;
			  		 console.log(querytype);
			  		console.log(JSON.stringify(result, null, '  '));
			  		});
				console.log(querytext);
					},

			update_product_cost:function (qty, id){
					

					var querytext ='UPDATE product SET costTotal = (cost * ';
					querytext += qty;
					querytext +=') + costTotal WHERE productId =';
					querytext += id;
					querytext += '; ';
					var querytype ='Product Cost Summary';
					 sq.con.query(querytext, function (err, result) {
			  		if (err) throw err;
			  		 console.log(querytype);
			  		console.log(JSON.stringify(result, null, '  '));
			  		});
				console.log(querytext);
					},

			lowInv:function (){
				var querytext= 'SELECT * FROM product WHERE productInventory <= 10';
				var querytype = 'Low inventory data retrieved (less than or equal to 10)';
				this.sqlConnect(querytext, querytype);
			},

			addInv:function (){
			var addInv = [
					  {
					   type: 'input',
					   name: 'productId',
					   message: "Pease enter product id number"
					   },

					  {
					    type: 'input',
					    name: 'qty',
					    message: "Please enter new total"
					  }
					];

					inquirer.prompt(addInv).then(answers => {
					  console.log(JSON.stringify(answers, null, '  '));
					
					
					var pid = answers.productId;
					var pi = answers.qty;
					var querytext='UPDATE product SET productInventory =';
					querytext += pi;
					querytext += ' WHERE productId =';
					querytext += pid;
					var querytype ='Item inventory updated';
					this.sqlConnect(querytext, querytype);
					//console.log (querytext);
					});
				
			},

			addProd:function (){
			var addProd = [
					  {
					   type: 'input',
					   name: 'productName',
					   message: "Enter new product name"
					   }, 
					   {
					   type: 'input',
					   name: 'productInventory',
					   message: "Enter Quantity in inventory"
					   }, 
					    {
					   type: 'input',
					   name: 'productCost',
					   message: "Enter unit price"
					   },
					   {
					   type: 'input',
					   name: 'depId',
					   message: "Please Enter Department Id"
					   },
					    {
					   type: 'input',
					   name: 'cost',
					   message: "Please Enter Cost Price"
					   } 

					];

					inquirer.prompt(addProd).then(answers => {
					  console.log(JSON.stringify(answers, null, '  '));
					var pn= '"';
					pn += answers.productName;
					pn += '"';

					var pc = answers.productCost;
					var pi = answers.productInventory;
					var pd = answers.depId;
					var cost = answers.cost;

					var querytext='INSERT INTO product (productName, productInventory, productCost, depId, cost) VALUES('
					querytext += pn;
					querytext += ",";
					querytext += pi;
					querytext += ",";
					querytext += pc;
					querytext += ",";
					querytext += pd;
					querytext += ",";
					querytext += cost;
					querytext += ")";

					var querytype ='Product added';
					//console.log(querytext);
					this.sqlConnect(querytext, querytype);
					});

				}
					
			}

module.exports.bLib = bamazonLibrary;
	