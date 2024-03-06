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

    getProductList: function (req, res){
        res.render("productlist");
    }

}

module.exports = controller