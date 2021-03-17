const LineInputStream = require('line-input-stream');
const fs = require('fs');
const { product, productInformation } = require('./db.js');
const mongoose = require('mongoose')
const path = require('path');

let filename = path.join(__dirname, '../../data/product.csv')
let productStream = LineInputStream(fs.createReadStream(filename, { start: 0 }));
productStream.setDelimiter("\n");	

mongoose.connection.on("open",function(err,conn) { 

    let bulk = product.collection.initializeOrderedBulkOp();
    let counter = 0;

    productStream.on("error",function(err) {
        console.log(err); 
    });

    productStream.on("line",function(line) {
        let row = line.split(",");     
        let obj = {
            id: row[0],
            name: row[1],
            slogan: row[2],
            description: row[3],
            category: row[4],
            default_price: row[5],
          };             

        bulk.insert(obj);  
        counter++;

        if ( counter % 1000 === 0 ) {
            productStream.pause(); 

            bulk.execute(function(err,result) {
                if (err) throw err;   
                bulk = product.collection.initializeOrderedBulkOp();
                productStream.resume(); 
            });
        }
    });

    productStream.on("end",function() {
        console.log(counter)
        if ( counter % 1000 !== 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   
            });
            console.log('completed writing all the documents')
        }
    });

});

