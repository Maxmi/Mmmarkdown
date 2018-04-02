require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./server');
const apiRoutes = require('./server/allfiles.js');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/allfiles', apiRoutes);

app.use((req, res) => res.render('error'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});

module.exports = app;
