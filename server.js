const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Include all routes
// const contact = require('./routes/contact.js');

const app = express()
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');

// parse application/json
app.use(bodyParser.json({
    extended: false,
    limit: '500mb'
}));
// parse plain text
app.use(bodyParser.text());

// Morgan middleware
app.use(morgan('dev'));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Access-Control-Allow-Headers, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
    res.render('index')
})

// app.use('/contact', contact)


app.listen(9000, function () {
    console.log('Server listening on port 9000!')
})