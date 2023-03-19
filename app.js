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
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employeeRoute');
const userRoutes = require('./routes/userRoute');

const error = require('./red/errors');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.get('/', function (req, res) {
//   res.send('Hard Work Api');
// });

app.use('/api/v1/hr/employee', employeeRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);


app.use(error);



module.exports = app;


