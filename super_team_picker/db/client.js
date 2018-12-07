
const knexfile = require('../knexfile');

const knexConnector = require('knex');

const knex = knexConnector(knexfile.development);

module.exports = knex;