const express = require('express');
const controllers = require('./controllers.js');


const router = express.Router()

router.route('/')
    .get(controller.allProducts);

router.route('/products/:product_id')
    .get(controller.getProduct);

router.route('/products/:product_id/styles')
    .get(controller.getStyles);

router.route('/:product_id/related')
    .get(controller.getRelated);


module.exports = router;