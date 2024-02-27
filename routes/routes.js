const express = require("express")

const controller = require("../controllers/controller.js")

const app = express()


app.get("/", controller.getAboutUs)

app.get("/home", controller.getHome)

app.get("/product", controller.getProduct)


module.exports = app