const express        = require('express');
const router         = express.Router();
const MongoClient    = require('mongodb').MongoClient;
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const dbURL          = require('./config/db').url;
const app            = express();
const port = 5000;
app.use(bodyParser.urlencoded({extended: true}));

// connect MongoDB 
mongoose
    .connect(dbURL, { useNewUrlParser: true })        
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

// Schemas 
const Note = mongoose.model('Note', require('./models/note').NoteSchema);
require('./app/routes')(app, Note);

app.listen(port, () => {
    console.log(`My port is ${port}` )
})
