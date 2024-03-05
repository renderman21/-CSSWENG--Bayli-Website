const db = require("../models/db.js")

const controller = {

    getAboutUs: function(req, res){
        res.render("aboutus")
    },

    getHome: function(req,res){
        res.render("home")
    },

    // This has been set to the first product. Change it when we are ready.
    getProduct: async function (req, res){
        const products = await db.getAllProducts()
        res.render("product", {
            Product: products[0], 
            ProductName: products[0]["Product Name"],
            ProductPrice: products[0]["Product Price"],
            ProductDesc: products[0]["Product Description"]
        });
    }

}

module.exports = controller