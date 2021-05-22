"use strict";
const ValidationContract = require("../validators/fluent_validator");
const repository = require("../repositories/customer_repository");
const emailService = require('../services/email_service');

const md5 = require("md5");

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição.",
    });
  }
};
exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );
  contract.isEmail(
    req.body.email,
    "Email invalido"
  );
  contract.hasMinLen(
    req.body.password,
    6,
    "O password deve conter pelo menos 6 caracteres"
  );
  // se os dados forem invalidos
  if (!contract.isValid()) {
    res.status(500).send(contract.errors()).end();
    return;
  }
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });
    emailService.send(
      req.body.email,
      "Bem vindo ao Silveira Store",
      global.EMAIL_TMPL.replace("{0}", req.body.name)
    );

    res.status(201).send({ message: "Customer successfull save"});
  } catch (e) {
    res.status(500).send({
      message: "Error to save Product",
      data: e,
    });
  }
};
