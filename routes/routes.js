// after EDITING this code, restart server.js
// nodemon does not properly save here

const express = require("express")

const controller = require("../controllers/controller.js")

const app = express()

app.get("/404", controller.get404)

app.get("/", controller.getHome)

app.get("/home", controller.getHome)

app.get("/product-list", controller.getProductList)

app.get("/about-us", controller.getAboutUs)

app.get("/product", controller.getProduct)

app.get("/get-product/:id", controller.fetchProduct);

module.exports = app