const fs = require('fs');
const {productInformation } = require('./db.js');
const mongoose = require('mongoose')
const path = require('path');

let photosCsv = path.join(__dirname, '../../data/photos.csv')

let LineByLineReader = require('line-by-line');
let photosStream = new LineByLineReader(photosCsv);


mongoose.connection.on("open",function(err,conn) { 

    let bulk = productInformation.collection.initializeOrderedBulkOp();
    let counter = 0;

    photosStream.on('error', function (err) {
        console.log(err)
    });

    photosStream.on("line",function(line) {
        let row = line.split(",");
            let obj = {
                id: row[0],
                url: row[2],
                thumbnail_url: row[3],
            }
        bulk.find( {  results: { $elemMatch: { style_id: row[1]} }} ).updateOne( {$addToSet: { "results.$.photos": obj } } )
        counter++;

        if ( counter % 1000 === 0 ) {
            photosStream.pause(); 

            bulk.execute(function(err,result) {
                if (err) throw err;   
                bulk = productInformation.collection.initializeOrderedBulkOp();
                photosStream.resume(); 
            });
        }
    });

    photosStream.on("end",function() {
        console.log(counter)
        if ( counter % 1000 !== 0 ) {
            bulk.execute(function(err,result) {
                if (err) throw err;   
            });
            console.log('completed writing all the documents')
        }
    });

});

