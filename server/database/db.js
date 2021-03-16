const mongoose = require('mongoose');

await mongoose.connect('mongodb://localhost/sdc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});