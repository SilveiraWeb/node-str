"use strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema =  new Schema({
    // _id: criado automaticamente pelo Schema
    title:{
        type: String,
        required:  true,
        trim: true
    },

    slug:{ // Produto Nome  = produto-nome
        type: String,
        required: [true, "O slug é obrigatorio"],
        trim: true,
        index: true,
        unique: true
    },
    description:{
        type: String,
        required: [true, "Decricao do produto obrigatoria"],
        trim: false
    },
    price:{
        type: Number,
        required: true
    },
    active:{
        type:Boolean,
        required:true,
        default: true,
    },
    tags:[{ // array de strings
        type: String,
        required: true
    }]
});

module.exports = mongoose.model("Products", schema);