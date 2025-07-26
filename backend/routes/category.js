const express = require("express");
const router = express.Router();
const Category = require("./../db/category");
const { addCategory, updateCategory, deleteCategory, getCategories, getCategorybyID } = require("../handlers/category-handlers");

router.post("",async (req,res)=>{
    let model=req.body;
    let result = await addCategory(model);
    res.send(result);
});


router.put("/:id",async (req,res)=>{

    let model=req.body;
    let id=req.params["id"];

    await updateCategory(id,model);
    res.send({message : "updated" });
});

router.get("",async (req,res)=>{
    let result = await getCategories();
    res.send(result);
});

router.get("/:id",async (req,res)=>{

    let id=req.params["id"];

    let result = await getCategorybyID(id);
    res.send(result);
});

router.delete("/:id",async (req,res)=>{

    let id=req.params["id"];

    await deleteCategory(id);
    res.send({message : "deleted" });
});

module.exports = router;