// A generic operation class to be inherited by each module;
// defines some basic db operations with error handling and fault checks to fetch data 

const utils = require('../utils');

class GenericOperations {
    constructor(Schema, options = {}) {
        this.Schema = Schema;
        this.options = options;
        return this;
    }

    async find(conditions = {}, sort = '', fields = {}) {
        return this.Schema.find(conditions)
      .select(fields)
      .sort(sort)
      .exec();
    }

    async findOne(conditions = {}) {
        const temp = await this.Schema.findOne(conditions).exec();
        if (!temp) { throw new Error('Not found'); }
        return temp;
    }

    async findById(id = false, conditions = {}) {
        conditions._id = id;
        return id && (this.Schema.findOne(conditions));
    }

    async update(id = false, data = {}) {
        utils.removeIdFields(data);
        const temp = id && (await this.findById(id));
        Object.assign(temp, data);
        await temp.save();
        return temp._doc;
    }

    async remove(id = false) {
        const temp = id && (await this.findById(id));
        await temp.remove();
        return temp._doc;
    }

    async insert(data = {}) {
        utils.removeIdFields(data);
        const temp = new this.Schema(data);
        await temp.save();
        return temp._doc;
    }

}

module.exports = GenericOperations;
