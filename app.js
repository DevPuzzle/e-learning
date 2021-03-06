const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const userRoutes = require('./server/routes/user');
const adminRoutes = require('./server/routes/admin');
const studentRoutes = require('./server/routes/student');
const teacherRoutes = require('./server/routes/teacher');

const categoryRoutes = require('./server/routes/category');
const subcategoryRoutes = require('./server/routes/subcategory');
const themeRoutes = require('./server/routes/theme');
const commentRoutes = require('./server/routes/comment');
const courseRoutes = require('./server/routes/course');
const schoolRoutes = require('./server/routes/school');
const searchRoutes = require('./server/routes/search');
const keys = require('./server/config/keys');
const path = require('path');

//mongoose.connect('mongodb://vitaliy:qa123123@ds261114.mlab.com:61114/e-learning');
// mongoose.connect(`mongodb://${keys.MONGO_USER}:${keys.MONGO_PASSWORD}@ds261114.mlab.com:61114/${keys.MONGO_DB}`);

mongoose.connect(`mongodb+srv://${keys.MONGO_USER}:${keys.MONGO_PASSWORD}@cluster0-hsxf7.mongodb.net/${keys.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected !!!');
    app.listen(process.env.PORT || 80);
}).catch(err => {
    console.log(err);
});
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* app.use('/', (req, res, next) => {
  res.status(200).json({
    'message': 'Helolo'
  })
}); */

app.use(expressValidator());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/search", searchRoutes);

app.use("/", express.static(path.join(__dirname, './client/build')));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});


module.exports = app;
