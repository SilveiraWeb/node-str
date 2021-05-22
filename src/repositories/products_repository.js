"use strict"
const mongoose = require("mongoose");
const Products = mongoose.model("Products");
mongoose.set("useFindAndModify", false);

exports.get = async() => {
  const res = await Products.find(
    {
      active: true,
    },"title description slug price tags"
  );
  return res;
};

exports.getBySlug = async (slug) => {
  const res = await Products.findOne(
    {
      slug: slug,
      active: true,
    },"title description slug price tags"
  );
  return res;
};

exports.getById = async (id) => {
  const res = await Products.findById(id);
  return res;
};

exports.getByTag = async(tag) => {
  const res = await Products.find({
    tags: tag,
    active: true,
  });
  return res;
};

exports.create = async (data) => {
  let product = new Products(data);
  await product.save();
};

exports.update = async (id, data) => {
  await Products.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug
    }
  });
};

exports.del = async (id) => {
    await Products.findOneAndRemove(id);
};