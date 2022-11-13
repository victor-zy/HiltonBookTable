process.env['NODE_CONFIG_DIR'] = require('path').join(__dirname, '../conf');
const config = require('config');

module.exports = config;