const Product= require("./../db/product");
const mongoose = require("mongoose");

async function AddProduct(model){
    let product = new Product({
        ...model
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id,model){
    await Product.findByIdAndUpdate(id,model);
}

async function deleteProduct(id){
    await Product.findByIdAndDelete(id);
}

async function getAllProducts(){
    let result = await Product.find();
    return (result.map((x)=>x.toObject()));
}

async function getProduct(id){
    let result = await Product.findById(id);
    return result.toObject();
}

async function getNewProducts(){
    let result = await Product.find({New:true});
    return (result.map((x)=>x.toObject()));
}

async function getFeaturedProducts(){
    let result = await Product.find({isFeatured:true});
    return (result.map((x)=>x.toObject()));
}


async function getProductForListing(searchTerm, CategoryID, page, pageSize, sortBy, sortOrder, brandID) {
  if (!sortOrder) sortOrder = -1;

  let queryFilter = {};

  if (searchTerm) {
    queryFilter.$or = [
      { name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
      { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }
    ];
  }

  if (CategoryID) {
    queryFilter.CategoryID = CategoryID; 
  }

  if (brandID) {
    queryFilter.brandID = brandID; 
  }

  let query = Product.find(queryFilter);

    if (sortBy) {
    query = query.sort({ [sortBy]: +sortOrder });
    }

    const products = await query
    .skip((+page - 1) * +pageSize)
    .limit(+pageSize);


  return products.map((x) => x.toObject());
}


module.exports = { 
    AddProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing
};