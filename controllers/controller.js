// after EDITING this code, restart server.js
// nodemon does not properly save here

const db = require("../models/db.js")

const controller = {

    get404: function(req, res){
        res.render("404")
    },

    getHome: function(req,res){
        res.render("home")
    },

    getAboutUs: function(req, res){
        res.render("aboutus")
    },

    getProductList: async function (req, res){
        const products = await db.getAllProducts();
        // Turn this into an array of objects
        res.render("productlist", {
            Products: products,
            layout: 'productlist-layout'
        });
    }, 

    getProductListSearch: async function (req, res){
        const products = await db.getAllProducts()

        let search_key = req.params.key.toLowerCase()
        console.log("\nSearching: " + search_key + "...")

        let searched_products = []

        let i = 0
        for(let prod of products){

            if(prod["Product Name"] && prod["Product Description"] && prod["Product Additional Info"]){

                let product_name = prod["Product Name"].toLowerCase()
                let product_desc = prod["Product Description"].toLowerCase()

                // will only send products that matches the search key
                if (product_name.includes(search_key) || product_desc.includes(search_key)){
                    let product = {
                        "_id": prod["_id"],
                        "Product Name": prod["Product Name"],
                        "Product Description": prod["Product Description"],
                        "Product Additional Info": prod["Product Additional Info"],
                        "Product Price": prod["Product Price"],
                        "Product Type": prod["Product Type"],
                        "Product Size": prod["Product Size"],
                        "Picture": prod["Picture"]
                    }
                    console.log("Found: " + product["Product Name"]);
                    searched_products[i] = product; 
                    i++;
                }
            }

        }
        
        res.render("productlist", {
            Products: searched_products,
            layout: 'productlist-layout'
        });
    }, 

      // This has been set to the first product. Change it when we are ready. (YES THIS IS SIMILAR TO THE BOTTOM OK)
    getProduct: async function (req, res){
        let {id} = req.query
        const product = await db.getProduct(req.query.id);
        res.render("product", {
            Product: product[0],
            layout: 'product-layout'
        });
    }, 
    fetchProduct: async function(req,res){

        const product = await db.getProduct(req.params.id);
        res.send(product);
    }

}

module.exports = controller