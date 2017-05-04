// another generic class to be inherited by each module. 
// Defines the generic operations, which when tied with the routes, exposes the API for the front-end to call for data

const _ = require('lodash');
const utils = require('../utils');

class GenericViews {
    constructor(Operations, options = {}) {
        this.Operations = Operations;
        this.options = options;
    }

    ctx() {
        const props = [];
        const context = {};
        let self = this;

        do {
            props.push(...Object.getOwnPropertyNames(self));
        } while (self = Object.getPrototypeOf(self));

        // Create a context image of this class without any:
        // - Duplicate fields
        // - Only functions bound to this context
        // - Nothing inherited from Object
        props.sort().filter(
            (v, i, a) => (
                v !== a[i + 1] && 
                typeof this[v] === 'function' &&
                Object[v] === undefined
                )
        ).map(v => context[v] = this[v].bind(this));

        return context;
    }

    async list(ctx) {
        const result = await this.Operations.find();
        return ctx.successJson(result);
    }

    async get(ctx) {
        const id = ctx.params.id;
        const result = await this.Operations.findById(id);
        return ctx.successJson(result);
    }

    async add(ctx) {
        const data = ctx.request.fields;
        const result = await this.Operations.insert(data);
        return ctx.successJson(result);
    }

    async update(ctx) {
        const id = ctx.params.id;
        const data = ctx.request.fields;
        const result = await this.Operations.update(id, data);
        return ctx.successJson(result);
    }

    async remove(ctx) {
        const id = ctx.params.id;
        const result = await this.Operations.remove(id);
        return ctx.successJson(result);
    }

}

module.exports = GenericViews;
