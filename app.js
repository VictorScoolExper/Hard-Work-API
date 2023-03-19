// express 
const express = require('express');
const app = express();

//rest of packages
const config = require('./config');
const morgan = require('morgan');

// configuration
app.set('port', config.app.port);

// database connection


// router
// const authRouter = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoute');

const error = require('./red/errors');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.get('/', function (req, res) {
//   res.send('Hard Work Api');
// });

app.use('/api/v1/hr/employee', employeeRoutes);

app.use(error);



module.exports = app;


