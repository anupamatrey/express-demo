var mongoose = require('mongoose');

var schema = mongoose.Schema;

var BearSchema = new schema({
    name : String,
    bear_id : String

});

module.exports = mongoose.model('Bear', BearSchema);