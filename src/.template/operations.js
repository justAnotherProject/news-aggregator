// the skeletal operations file that inherits the generic operations and a few of it's own to perform on the module's model


const _ = require('lodash');

const utils = require('../../utils');
const config = require('../../config');

const Model = require('./models');
const GenericOperations = require('../../globals/operations.js');

class Operations extends GenericOperations {

}

module.exports = new Operations(Model);

// exports an object created using the Operations class, tied to the specific models for the module

