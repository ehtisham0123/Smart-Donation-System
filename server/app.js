var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mysql = require("mysql");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smart_donation_system",
});

// connect to database
db.connect();


var adminRouter = require('./routes/admin/admin');
var donorsAdminRouter = require('./routes/admin/donors');
var neediesAdminRouter = require('./routes/admin/needies');
var patientsAdminRouter = require('./routes/admin/patients');
var studentsAdminRouter = require('./routes/admin/students');


var donorRouter = require('./routes/donor/donor');
var neediesDonorRouter = require('./routes/donor/needies');
var patientsDonorRouter = require('./routes/donor/patients');
var studentsDonorRouter = require('./routes/donor/students');



var needyRouter = require('./routes/needy/needy');
var studentRouter = require('./routes/student/student');
var patientRouter = require('./routes/patient/patient');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouter);
app.use('/admin/needies', neediesAdminRouter);
app.use('/admin/donors', donorsAdminRouter);
app.use('/admin/patients', patientsAdminRouter);
app.use('/admin/students', studentsAdminRouter);

app.use('/donor', donorRouter);
app.use('/donor/needies', neediesDonorRouter);
app.use('/donor/patients', patientsDonorRouter);
app.use('/donor/students', studentsDonorRouter);

app.use('/needy', needyRouter);
app.use('/patient', patientRouter);
app.use('/student', studentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
