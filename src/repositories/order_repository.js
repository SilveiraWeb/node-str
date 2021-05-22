"use strict";
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
mongoose.set("useFindAndModify", false);

exports.get = async () => {
  const res = await Order.find({}).populate("customer", "name email").populate("items.product", "title price");
  return res;
};

exports.create = async (data) => {
  let order = new Order(data);
  await order.save();
};