const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const trackerHelpers = require('./helpers/trackerHelpers')(db);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const habitsRouter = require('./routes/habits');
const januaryHabitsRouter = require('./routes/januaryHabits');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/habits', habitsRouter(trackerHelpers));
app.use('/api/januaryhabits', januaryHabitsRouter(trackerHelpers));

module.exports = app;
