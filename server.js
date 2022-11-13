const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const config = require('./lib/config');
const indexRouter = require('./routes/index');

const mongooseUrl = config.database.mongodbUrl;
mongoose.connect(mongooseUrl);
const database = mongoose.connection;
database.on('error', (error) => { console.log(error); });
database.once('connected', () => { console.log('database connection'); });


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', indexRouter);

app.listen(config.port || 3000, () => {
    console.log(`Server started at ${config.port}`);
})