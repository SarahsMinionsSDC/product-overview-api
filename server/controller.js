const dbHelpers = require('./database/dbHelpers.js');

const controllers = {
    allProducts: (req, res) => {
        dbHelpers.allProducts(req, (err, data) => {
          if (err) {
              res.status(400).send(err);
          } else {
              res.status(200).send(data);
          }
        })
    },
    getProduct: (req, res) => {
        dbHelpers.getProduct(req, (err, data) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(data);
          }
        })
    },
    getStyles: (req, res) => {
        dbHelpers.allProducts(req, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(data);
            }
          })
    },
    getRelated: (req, res) => {
        dbHelpers.getRelated(req, (err, data) => {
          if (err) {
              res.status(400).send(err);
          }  else {
              res.status(200).send(data);
          }
        })
    },
}




module.exports = controllers;