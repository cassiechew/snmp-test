var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/config.json');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

const schedule = require('node-schedule');

const job = schedule.scheduleJob('* * 1 * *', () => {
    // Some sort of snmp query here
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(config.app.port, () => {
    console.log(`Success! Your application is running on port ${config.app.port}.`);
});

module.exports = app;
