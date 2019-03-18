const ObjectID = require('mongodb').ObjectID
module.exports = function(router, Schema) {    
    // route: '/notes'
    // type: POST
    // func: put new Note into DB
    router.post('/notes', (req, res) => {
        new Schema({
            body: req.body.body,
            title: req.body.title
        })
            .save()
            .then((result) => {
                res.send(result);
            })
        
        //res.send('}{qwe')
    });

    // route: '/notes/:id'
    // type: GET
    // func: Take Note from DB
    router.get('/notes/:id', (req, res) => {
        const id = req.params.id;            
        const details = { _id: ObjectID(`${id}`) };
        Schema
            .findOne(details)
            .then((item) => {
                if (item) {
                    res.send(item);
                } else {
                    res.send("No Notes with this id")
                }                
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
    })

    // route: '/notes/:id'
    // type: DELETE
    // func: Remove Note from DB
    router.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: ObjectID(`${id}`) };
        Schema.findOneAndRemove(details, (err, item) => {
            if (err) {
                res.send(err);
            } else {
                res.send(`Note ${id} deleted!`);
            } 
        });
    });

    // route: '/notes/:id'
    // type: PUT
    // func: Update Note in DB
    router.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: ObjectID(`${id}`) };
        const note = { body: req.body.body, title: req.body.title };
        Schema.findOneAndUpdate(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            } 
        });
    });
};