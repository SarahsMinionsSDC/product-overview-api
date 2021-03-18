const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js');
const PORT = 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`)
});