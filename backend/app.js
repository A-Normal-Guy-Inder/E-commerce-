require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const categoryRoutes = require("./routes/category");
const brandRoutes = require ("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes= require("./routes/customer");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");
const { verifyToken,isAdmin } = require('./middleware/auth-middleware');

/*
 * A credentialed request cannot use a wildcard origin, so the allowlist is
 * explicit. FRONTEND_URL takes a comma-separated list of deployed origins.
 */
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:4200")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server running");
});

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brands", verifyToken, isAdmin, brandRoutes);
app.use("/products", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/users", verifyToken, isAdmin, userRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DB || "project-db"
    });
}

connectDb().catch((err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log("Server running on port", port);
});
