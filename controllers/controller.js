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
        res.render("aboutus", {
            layout: 'aboutus-layout'
        })
    },
    getForm: function(req, res){
        res.render("form", {
            layout: 'form-layout'
        })
    },

    sendForm: function(req, res){

        const toSend = JSON.stringify(req.body)

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: toSend
        })
        .then(async (resp) => {
            let j = await resp.json();
            if (resp.status == 200){
                // Go to new page
                res.render('form-result',{
                    result: true,
                    layout: 'form-layout'
                })
            }
            else{
                res.render('form-result', {
                    layout: 'form-layout', 
                    result: false
                })
            }
        })
        .catch(error=>{
            res.render('form-result', {
                layout: 'form-layout', 
                result: false
            })
        })

    },
    getProductList: async function (req, res){
        const products = await db.getAllProducts();
        // Turn this into an array of objects

        // Check if query exists
        if ("q" in req.query){
            console.log("there is query")
            let {q} = req.query
            
            let searched_products = []
            let i = 0
            for(let prod of products){

                if(prod["Product Name"] && prod["Product Description"] && prod["Product Additional Info"]){
    
                    let product_name = prod["Product Name"].toLowerCase()
                    let product_desc = prod["Product Description"].toLowerCase()
    
                    // will only send products that matches the search key
                    if (product_name.includes(q) || product_desc.includes(q)){
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

            return
        }

        res.render("productlist", {
            Products: products,
            layout: 'productlist-layout'
        });
    }, 

      // This has been set to the first product. Change it when we are ready. (YES THIS IS SIMILAR TO THE BOTTOM OK)
    getProduct: async function (req, res){
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