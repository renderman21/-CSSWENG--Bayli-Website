// after EDITING this code, restart server.js
// nodemon does not properly save here

const db = require("../models/db.js")

const controller = {

    getHome: function(req,res){
        res.render("home")
    },

    getProduct: function (req, res){
        res.render("product");
    },

    getAboutUs: function(req, res){
        res.render("aboutus")
    },

    getProductList: async function (req, res){
        const products = await db.getAllProducts();
        // Turn this into an array of objects
        res.render("productlist", {
            Products: products
        });
    }, 
      // This has been set to the first product. Change it when we are ready. (YES THIS IS SIMILAR TO THE BOTTOM OK)
    getProduct: async function (req, res){
        const products = await db.getAllProducts()
        res.render("product", {
            Product: products[3]
        });
    }, 
    getProductTest: async function(req,res){

        const product = await db.getProduct(req.params.id);
        res.send(product);
    }

}

module.exports = controller