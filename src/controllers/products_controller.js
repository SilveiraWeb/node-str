"use strict";

const ValidationContract = require("../validators/fluent_validator");
const repository = require("../repositories/products_repository");

exports.get = async(req, res, next) => {
  try{
    let data = await repository.get();
    res.status(200).send(data);
  } catch(e) {
      res.status(500).send({
        message: "Falha ao processar requisição."
      });
    }
};

exports.getBySlug = async(req, res, next) => {
  try{
    let data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  }catch(e) {
      res.status(500).send({
        message: "Falha ao processar requisição"
      });
    }
};
exports.getById = async(req, res, next) => {
  try{ 
    let data = await repository.getById(req.params.id)
    res.status(200).send(data);
  }catch(e){
      res.status(500).send({
        message: "Falha ao processar requisição"
      });
  }
};

exports.getByTag = async(req, res, next) => {
  try{
    let data = repository.getByTag(req.param.tags)
    res.status(200).send(data);
  }catch(e) {
      res.status(500).send({
        message: "Falha ao processar requisição"
      });
    }
};

exports.post = async(req, res, next) => {
  let contract = new  ValidationContract();
  contract.hasMinLen(req.body.title, 3, "O titulo deve conter pelo menos 3 caracteres")
  contract.hasMinLen(req.body.slug, 3, "O slug deve conter pelo menos 3 caracteres")
  contract.hasMinLen(req.body.description, 3, "A descrição deve conter pelo menos 3 caracteres")
  // se os dados forem invalidos
  if(!contract.isValid()){
    res.status(500).send(contract.errors()).end();
    return;
  }
  try{
    let data = await repository.create(req.body)
    res.status(201).send({ message: "Product successfull save", data });
  }catch(e) {
      res.status(500).send({ 
        message: "Error to save Product", data: e 
      });
    }
};

exports.put = async(req, res, next) => {
  try{
    let data = await repository.update(req.params.id, req.body)
    res.status(200).send({ message: "Update product successfully", data });
  }catch(e){
    res.status(500).send({ 
      message: "Update product error", data: e });
  }
};

exports.del = async(req, res, next) => {
  try{
    let data = await repository.del(req.body.id);
    res.status(200).send({ 
      message: "Remove product successfully", data 
    });
  }catch(e){
    res.status(500).send({
      message: "Remove product error", data: e 
    });
  }
};
