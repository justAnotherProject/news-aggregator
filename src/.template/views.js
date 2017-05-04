// the view class for the module that inherits the generic view class
// defines the methods to be invoked when a route for the API is hit and performs the required db operations

const operations = require('./operations');
const GenericViews = require('../../globals/views');

class Views extends GenericViews {
    
}

module.exports = new Views(operations);
 // exports a view object 