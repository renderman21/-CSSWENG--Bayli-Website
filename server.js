/*
Use in the terminal when there is no node_modules folder:
    npm install
*/

const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT
const hostname = process.env.HOSTNAME


const express = require("express")

const exphbs = require("express-handlebars")

const routes = require("./routes/routes.js")

const db = require("./models/db.js")

const app = express()

// default templating file is main.hbs
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers:{
            // This gets the pictures object into an array
            getPicture: function(obj){
                var arr = []
                for (var key in obj.Picture){
                    if (key != "CPicture"){
                        var newObj = {picture: obj.Picture[key], picType: key, id:obj._id};
                        arr.push(newObj);
                    }
                }

                for (var pic in obj.Picture.CPicture){
                    var newObj = {picture: obj.Picture.CPicture[pic], picType: "CPicture", index: pic}
                    arr.push(newObj)
                }

        
                return arr
            },
            // This will only get one picture (this is static)
            getFocusedPicture: function(obj){
                var arr = []
                for (var key in obj.Picture){
                    var newObj = {picture: obj.Picture[key], picType: key};
                    arr.push(newObj);
                }
        
                return arr[0].picture
            }, 
            // Parse the price object into a readable one, depending on the size. NOTE: this is static
            getPrice: function(price){
                var arr = []
                for (var key in price){
                    var newObj = {size: key, price: price[key]}
                    arr.push(newObj)
                }
        
                return arr[0].price
            },
            allProductsToArray: function(products){
                var arr = []
        
                for (var key in products){
                    arr.push(products[key])
                }
                return arr;
            },

            getDisplayPicture: function(picture){
                var arr = []
                for(var key in picture){
                    arr.push(picture[key])
                }

                return arr[0]

            },

            convertToML: function(size, unit){
                if (unit == 'L'){
                    return size * 1000
                }

                return size

            }, 
            urlToArray: function(url){

                var arr = []

                for(var key in url){
                    arr.push(url[key])
                }

                return arr[0]
                
            },
            checkUrl: function(url){
                if (url == null){
                    return false
                }

                return true
            },
            // Return true if the picture is not a customer review picture
            isCPicture: function(picType){
                if (picType != "CPicture"){
                    return true
                }
                
                return false

            }
    }
}))

// view engine as hbs
app.set("view engine", "hbs")

// body parser for req.body
app.use(express.urlencoded({extended: true}))

// static files in public folder like html, css, js
app.use(express.static("public"))


// routes for the webpages
app.use("/", routes)

// if route not found, load default error webpage in ../views/404.hbs
app.use(function (req, res) {
    res.render('404.hbs');
});


app.listen(port, function(){
    console.log("Server running at: ")
    console.log("PORT: " + port)
    console.log("http://" + hostname + ":" + port)
    db.connectToDB()

})

