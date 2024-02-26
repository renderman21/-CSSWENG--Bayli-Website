const db = require("../models/db.js")

const controller = {

    getAboutUs: function(req, res){
        res.render("aboutus")
    },

    getHome: function(req,res){
        res.render("home")
    }

}

module.exports = controller