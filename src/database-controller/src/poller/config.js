const basicConfig = require('@dbc/core/config')
const _ = require('lodash')
const Joi = require('joi');

const configSchema = Joi.object().keys({
  dbConnectionStr: Joi.string()
    .required(),
  maxDatabaseConnection: Joi.number()
    .integer()
    .required(),
  intervalSecond:  Joi.number()
    .integer()
    .required(),
  writeMergerUrl: Joi.string()
    .uri()
    .required(),
}).required();


config = {
  dbConnectionStr: process.env.DB_CONNECTION_STR,
  maxDatabaseConnection: parseInt(process.env.MAX_DB_CONNECTION),
  intervalSecond: parseInt(process.env.INTERVAL_SECOND),
  writeMergerUrl: parseInt(process.env.WRITE_MERGER_URL),
}

const {error, value} = Joi.validate(config, configSchema);
if (error) {
  throw new Error(`Config error\n${error}`);
}

module.exports = _.assign(basicConfig, value)