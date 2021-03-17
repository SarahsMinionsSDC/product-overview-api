const LineInputStream = require('line-input-stream');
const fs = require('fs');
const { product, productInformation } = require('./db.js');
const mongoose = require('mongoose')
const path = require('path');

let filename = path.join(__dirname, '../../data/product.csv')

let LineByLineReader = require('line-by-line');
let lr = new LineByLineReader(filename);



mongoose.connection.on("open",function(err,conn) { 

    let bulk = product.collection.initializeOrderedBulkOp();
    let counter = 0;

    lr.on('error', function (err) {
        console.log(err)
    });

    lr.on("line",function(line) {
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
            lr.pause(); 

            bulk.execute(function(err,result) {
                if (err) throw err;   
                bulk = product.collection.initializeOrderedBulkOp();
                lr.resume(); 
            });
        }
    });

    lr.on("end",function() {
        console.log(counter)
        if ( counter % 1000 !== 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   
            });
            console.log('completed writing all the documents')
        }
    });

});

