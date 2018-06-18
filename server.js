const express = require('express');

const app = express();
const bodyParser = require('body-parser');
var Bear = require('./models/bear');
var mongoose = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000  //Set the Application Port

//Routes Rest API

var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', (req, res) => {
    res.json({ message: 'Rest API' });
});

router.route('/bears')
    .post(function (req, res) {
        var bear = new Bear();
        bear.name = req.body.name;

        // save the bear and check for errors
        bear.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        })
    })
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if (err) {
                console.log('Error in Finding the beans');
                res.send(err);
            }
            res.send(bears);


        })

    })

router.route('/bears/:bear_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });


//Register Route
app.use('/api', router);

//MongoDB Setup
mongoose.connect('mongodb://localhost:27017/application', function (error) {
    if (error) console.log('Error while connection to DB ' + error)

    console.log('Connection Sucessfully');

}); // connect to our database



app.listen(port);
console.log('Server Listening at ' + port);
