var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	uid: ObjectId,
	title: String,
	desc: String,
	price: Number
});

module.exports = mongoose.model('Item', ItemSchema);