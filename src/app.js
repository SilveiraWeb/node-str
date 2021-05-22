"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config")
const app = express();

//  connect mongo
mongoose.connect(config.connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const Products = require("./models/products_model")
const Customer = require("./models/customer_model")
const Order = require("./models/order_model")

// rotas
const indexRoutes = require("./routes/index_router");
const productRouter = require("./routes/products_router");
const customerRouter = require("./routes/customer_router");
const orderRouter = require("./routes/order_router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", indexRoutes);
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);


module.exports = app;
