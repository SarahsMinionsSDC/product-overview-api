const LineInputStream = require('line-input-stream');
const fs = require('fs');
const {productInformation } = require('./db.js');
const mongoose = require('mongoose')
const path = require('path');

let filename = path.join(__dirname, '../../data/photos.csv')

let LineByLineReader = require('line-by-line');
let lr = new LineByLineReader(filename);



mongoose.connection.on("open",function(err,conn) { 

    let bulk = productInformation.collection.initializeOrderedBulkOp();
    let counter = 0;

    lr.on('error', function (err) {
        console.log(err)
    });

    lr.on("line",function(line) {
        let row = line.split(",");
            let obj = {
                id: row[0],
                url: row[2],
                thumbnail_url: row[3],
            }
            
        bulk.find({results:{$elemMatch:{style_id:row[1]}}}).updateOne({$addToSet: { photos: obj }})
        counter++;

        if ( counter % 1000 === 0 ) {
            lr.pause(); 

            bulk.execute(function(err,result) {
                if (err) throw err;   
                bulk = productInformation.collection.initializeOrderedBulkOp();
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

