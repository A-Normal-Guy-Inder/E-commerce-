const express = require ("express");
const { AddProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require("../handlers/product-handler");
const router = express.Router();

router.post("",async(req,res)=>{
    let model=req.body;
    let product= await AddProduct(model);
    res.send(product);
});

router.put("/:id",async (req,res)=>{
    let model=req.body;
    let id = req.params["id"];
    await updateProduct(id,model);
    res.send({message: "Updated" });
});

router.delete("/:id",async (req,res)=>{
    let id = req.params["id"];
    await deleteProduct(id);
    res.send({message: "Deleted" });
});

router.delete("/:id",async (req,res)=>{
    let id = req.params["id"];
    await deleteProduct(id);
    res.send({message: "Deleted" });
});

router.get("/:id",async (req,res)=>{
    let id = req.params["id"];
    let result = await getProduct(id);
    res.send(result);
});

router.get("",async (req,res)=>{
    let result = await getAllProducts();
    res.send(result);
});

module.exports=router;