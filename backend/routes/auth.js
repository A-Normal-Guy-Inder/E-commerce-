const express= require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register",async(req,res)=>{
    let model=req.body;
    if(model.name && model.email && model.password){
        await registerUser(model);
        res.send({ message: "User Registered", });
    }
    else{
        res.status(400).json({
            error:"Please provide name, email and password."
        });
    }
});

router.post("/login",async(req,res)=>{
    let model=req.body;
    if(model.email && model.password){
        const result = await loginUser(model);
        if(result){
            return res.send(result);
        }
        else{
            res.status(400).json({
                error:"Invalid email and password."
            });
        }
    }
    else{
        res.status(400).json({
            error:"Please provide email and password."
        });
    }
});

router.get("/contact-us", async (req, res) => {
    try {
        const contacts = await require('../handlers/contact_us-handler').getAllContacts();
        res.send(contacts);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve contact requests." });
    }
});

module.exports= router;