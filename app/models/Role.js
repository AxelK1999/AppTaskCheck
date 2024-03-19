const mongoose = require('mongoose');

const ROLES = ["user"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,//Mantener un registro de la versión del documento por medio de campo __v.
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = { ROLES, Role};