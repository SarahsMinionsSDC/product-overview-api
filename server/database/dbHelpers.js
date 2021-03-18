const {product, productInformation} = require('./db.js');

const dbHelpers = {
    allProducts: (req, callback) => {},
    getProduct: (req, callback) => {
        productInformation.find({product_id: req.params.product_id}, (err, result) => {
            callback(err, result);
        })
    },
    getStyles: (req, callback) => {
        productInformation.find({product_id: req.params.product_id}, (err, result) => {
            callback(err, result);
        })
    },
    getRelated: (req, callback) => {
        productInformation.find({product_id: req.params.product_id}, (err, result) => {
            callback(err, result);
        })
    },
}



module.exports = dbHelpers;