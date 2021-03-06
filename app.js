const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const rock_stars = require('./routes/rock_stars');
const weapons = require('./routes/weapons')
const star_weapon = require('./routes/star_weapon')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index)
app.use('/api/rock-stars', rock_stars)
app.use('/api/weapons', weapons)
app.use('/api/star-weapon', star_weapon)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = 'NOT FOUND\nPlease make sure your GET endpoints start with either "/api/rock-stars" or "/api/weapons", and your POST endpoints start with /api/star-weapon'
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const errorMessage = `ERROR! ${err.status} - ${err.message}`

  res.status(err.status || 500);
  res.send(errorMessage);
});

module.exports = app;
