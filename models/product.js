let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    category:[String],
    price: {type: Number, required: true},
    imgPath: {type: String, required: true},
    stock: {type: Number, required: true},
    main:{type: Boolean},
    phoneNumber: {type:Number}
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;