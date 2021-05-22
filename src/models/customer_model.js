"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // _id: criado automaticamente pelo Schema
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    // Produto Nome  = produto-nome
    type: String,
    required: [true, "O email é obrigatorio"],
    trim: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model("Customer", schema);
