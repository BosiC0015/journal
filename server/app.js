const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
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
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/diaries', diariesRouter(dbHelpers));
app.use('/api/plans', plansRouter(dbHelpers));

module.exports = app;
