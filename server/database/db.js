const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to sdc');
}); 


const Schema = mongoose.Schema;

const essentialInfo = new Schema({
  _id: mongoose.Types.ObjectId,
  id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
}, { strict: false });


const allInfo = new Schema({
  _id: mongoose.Types.ObjectId,
  id: String,
  product_id: String,
    features: [
      {
        feature: String,
        value: String,
      }
    ],
    results: [
      {
        style_id: String,
        name: String,
        original_price: String,
        sale_price: String,
        default: Number,
        photos: [
          {
            thumnail_url: String,
            url: String,
          }
        ],
        skus: {
          number: {
            quantity: Number,
            size: String,
          }
        }
      }
    ],
  related_products: Array,
})

const product = mongoose.model('product', essentialInfo);
const productInformation = mongoose.model('product-information', allInfo)


module.exports = {
  product: product,
  productInformation: productInformation,
};