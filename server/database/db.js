const mongoose = require('mongoose');

await mongoose.connect('mongodb://localhost/sdc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const essentialInfo = new Schema({
  _id: ObjectId,
  id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
});

mongoose.model('essentialInfo', essentialInfo);

const allInfo = new Schema({
    features: [
      {
        feature: String,
        value: String,
      }
    ],
    results: [
      {
        name: String,
        original_price: String,
        sale_price: String,
        default: Boolean,
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
    ]
})