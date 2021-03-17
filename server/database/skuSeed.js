const LineInputStream = require('line-input-stream');
const fs = require('fs');
const {productInformation } = require('./db.js');
const mongoose = require('mongoose')
const path = require('path');

let skusCsv = path.join(__dirname, '../../data/skus.csv')

let LineByLineReader = require('line-by-line');
let skusStream = new LineByLineReader(skusCsv);



mongoose.connection.on("open",function(err,conn) { 

    let bulk = productInformation.collection.initializeOrderedBulkOp();
    let counter = 0;

    skusStream.on('error', function (err) {
        console.log(err)
    });

    skusStream.on("line",function(line) {
        let row = line.split(",");
            let obj = {};
            obj.size = row[2];
            obj.quantity = row[3];
        
        let $set = { $set: {} };
        $set.$set['results.$.skus.' + row[0]] = obj

        bulk.find( {  results: { $elemMatch: { style_id: row[1]} }} ).updateOne( $set )
        counter++;

        if ( counter % 1000 === 0 ) {
            skusStream.pause(); 

            bulk.execute(function(err,result) {
                if (err) throw err;   
                bulk = productInformation.collection.initializeOrderedBulkOp();
                skusStream.resume(); 
            });
        }
    });

    skusStream.on("end",function() {
        console.log(counter)
        if ( counter % 1000 !== 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   
            });
            console.log('completed writing all the documents')
        }
    });

});

