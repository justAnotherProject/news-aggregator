

function removeIdFields(data) {
    if (data.id) {
        delete data.id;
    }
    if (data._id) {
        delete data._id;
    }
}

function md5Hash(string) {
    const md5Sum = crypto.createHash('md5');

    if (!string) {
        string = module.exports.randomString();
    }

    md5Sum.update(string);

    return md5Sum.digest('hex');
}

function randomString(lenght, charset) {
    const options = {};

    if (lenght) {
        options.length = lenght;
    }

    if (charset) {
        options.pool = charset;
    }

    return 'chance.string(options)';
}

module.exports = {
    removeIdFields,
    md5Hash,
    randomString    
};
