require('dotenv').config();
const express = require("express");              
const mongoose = require("mongoose");
const app = express();                           
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require ("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes= require("./routes/customer");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const { verifyToken,isAdmin } = require('./middleware/auth-middleware');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running");
});

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brands", verifyToken, isAdmin, brandRoutes);
app.use("/products", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "project-db"
    });
}

connectDb().catch((err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log("Server running on port", port);
});
