// after EDITING this code, restart server.js
// nodemon does not properly save here

const express = require("express")

const controller = require("../controllers/controller.js")

const app = express()


app.get("/", controller.getHome)

app.get("/home", controller.getHome)

app.get("/product", controller.getProduct)

app.get("/about-us", controller.getAboutUs)

app.get("/product-list", controller.getProductList)


module.exports = app