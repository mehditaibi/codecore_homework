const express = require("express");
const app = express();

const logger = require('morgan');
app.use(logger('dev'));
const methodOverride = require("method-override");

app.set('view engine', 'ejs');

const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.use(
    methodOverride((req, res) => {
      if (req.body && req.body._method) {
        const method = req.body._method;
        return method;
      }
    })
);

app.use(express.static(path.join(__dirname, "public")));

const baseRouter = require('./routes/base');
app.use('/', baseRouter);

const cohortsRouter = require('./routes/cohorts');
app.use('/cohorts', cohortsRouter);

const PORT = 4545;
const HOST = 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`Server is listening on port: ${PORT} and host: ${HOST}!`)
});