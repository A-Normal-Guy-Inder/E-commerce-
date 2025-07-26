const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    Price: Number,
    discount: Number,
    images: [String],
    CategoryID: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    brandID: {type: mongoose.Schema.Types.ObjectId, ref: 'brands'},
    isFeatured: Boolean,
    New: Boolean,
});
const Product = mongoose.model("products",productSchema);
module.exports = Product;