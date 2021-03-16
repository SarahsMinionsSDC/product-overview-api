const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`)
});