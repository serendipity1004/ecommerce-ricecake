let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    imgPath: {type: String, required: true},
    stock: {type: Number, required: true},
    main:{type: Boolean},
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;