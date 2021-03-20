const LineInputStream = require('line-input-stream');
const fs = require('fs');
const {productInformation } = require('./db.js');
const mongoose = require('mongoose')
const path = require('path');

let relatedCsv = path.join(__dirname, '../../data/related.csv')

let LineByLineReader = require('line-by-line');
let relatedStream = new LineByLineReader(relatedCsv);



mongoose.connection.on("open",function(err,conn) { 

    let bulk = productInformation.collection.initializeOrderedBulkOp();
    let counter = 0;

    relatedStream.on('error', function (err) {
        console.log(err)
    });

    relatedStream.on("line",function(line) {
        let row = line.split(",");

        bulk.find( {product_id: row[1] } ).updateOne( {$addToSet : {related_products: row[2]}} )
        counter++;

        if ( counter % 1000 === 0 ) {
            relatedStream.pause(); 

            bulk.execute(function(err,result) {
                if (err) throw err;   
                bulk = productInformation.collection.initializeOrderedBulkOp();
                relatedStream.resume(); 
            });
        }
    });

    relatedStream.on("end",function() {
        console.log(counter)
        if ( counter % 1000 !== 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   
            });
            console.log('completed writing all the documents')
        }
    });

});

