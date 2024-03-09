const { default: mongoose } = require("mongoose");

// Connect to database (LOCALLY)
function connectToDB(){
    mongoose.connect(process.env.LOCAL_DB_URL).then(
        () => {
            console.log("MongoDB connection successful!")
        }
    ).catch( 
        () => {
            console.log("MongoDB connection failed!");
    })
}


const productSchema = mongoose.Schema({
    "Product Name": String, 
    "Product Description": String,
    "Product Additional Info": String,
    "Product Price": Object,
    "Product Type": Number,
    "Product Size": Object,
    "Picture": Object
});

const Product = mongoose.model("Product", productSchema, "Products");

async function getAllProducts(){
    return await Product.find({}).lean();
}

async function getProduct(id){
    return await Product.find({
        _id: id
    }).lean();
}

module.exports = {
    connectToDB,
    getAllProducts,
    getProduct
}