const db = require('./db');
const usersHelpers = require('./helpers/usersHelper')(db);
const plansHelpers = require('./helpers/plansHelpers')(db);
const diariesHelpers = require('./helpers/diariesHelpers')(db);
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
const diariesRouter = require('./routes/diaries');
const plansRouter = require('./routes/plans');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(usersHelpers));
app.use('/api/habits', habitsRouter(trackerHelpers));
app.use('/api/januaryhabits', januaryHabitsRouter(trackerHelpers));
app.use('/api/diaries', diariesRouter(diariesHelpers));
app.use('/api/plans', plansRouter(plansHelpers));

module.exports = app;
