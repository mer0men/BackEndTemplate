const Schema = require('mongoose').Schema;

module.exports = {
    NoteSchema : new Schema({
        title : {
            type: String,
            required: true
        },
        body : {
            type: String,
            required: true
        }
    })
}