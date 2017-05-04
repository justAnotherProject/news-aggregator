// Skeletal  outline for what structure the models for a module should follow

const mongoose = require('mongoose');

const schema = {
    type: Number
};

const Schema = new mongoose.Schema(schema, { strict: true });
module.exports = mongoose.model('Cart', Schema);

// exports the model created using the schema
