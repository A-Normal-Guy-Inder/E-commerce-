const express = require("express");
const { getNewProducts, getFeaturedProducts, getProductForListing, getProduct } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handlers");
const { getBrands } = require("../handlers/brand-handler");
const { rawListeners } = require("../db/product");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../handlers/wishlist-handler");
const { getCartItems, addToCart, removefromCart, clearCart } = require("../handlers/shopping-cart-handler");
const { addOrder, getCustomerOrders } = require("../handlers/order-handler");
const router = express.Router();

router.get("/new-products",async (req,res)=>{
    const product= await getNewProducts();
    res.send(product);
});

router.get("/featured-products",async (req,res)=>{
    const product= await getFeaturedProducts();
    res.send(product);
});

router.get("/categories",async (req,res)=>{
    let result = await getCategories();
    res.send(result);
});

router.get("/brands",async (req,res)=>{
    let result = await getBrands();
    res.send(result);
});

router.get("/products",async (req,res)=>{
    const { searchTerm,CategoryID,page,pageSize,sortBy,sortOrder,brandID } = req.query;
    let result = await getProductForListing(
        searchTerm,CategoryID,page,pageSize,sortBy,sortOrder,brandID,pageSize
     );
    res.send(result);
});

router.get("/products/:id",async (req,res)=>{
    const id= req.params["id"];
    const product=await getProduct(id);
    res.send(product);
});

router.get("/wishlists",async (req,res)=>{
    let userId=req.user.id;
    const items= await getWishlist(userId);
    res.send(items);
});

router.post("/wishlists/:id",async (req,res)=>{
    let userId=req.user.id;
    let productId=req.params.id;
    let product=await addToWishlist(userId,productId);
    res.send(product);
});

router.delete("/wishlists/:id",async (req,res)=>{
    let userId=req.user.id;
    let productId=req.params.id;
    await removeFromWishlist(userId,productId);
    res.send({message: "Product Removed"});
});

router.get("/carts",async (req,res)=>{
    const userId=req.user.id;
    const items= await getCartItems(userId);
    res.send(items);
});

router.post("/carts/:id",async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    const quantity=req.body.quantity;
    const items= await addToCart(userId,productId,quantity);
    res.send(items);
});

router.delete("/carts/:id",async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    await removefromCart(userId,productId);
    res.send({message: "Product Removed"});
});


router.post("/order",async (req,res)=>{
    const userId=req.user.id;
    const order=req.body;
    await addOrder(userId,order);
    await clearCart(userId);
    res.send({message : " Order Placed "});
});

router.get("/orders",async (req,res)=>{
    const userId=req.user.id;
    const orders=await getCustomerOrders(userId);
    res.send(orders);
});

router.post("/contact-us", async (req, res) => {
    const contactModel = req.body;
    try {
        await require('../handlers/contact_us-handler').addContactUs(contactModel);
        res.status(201).send({ message: "Contact request submitted successfully." });
    } catch (error) {
        res.status(500).send({ error: "Failed to submit contact request." });
    }
});

module.exports=router;