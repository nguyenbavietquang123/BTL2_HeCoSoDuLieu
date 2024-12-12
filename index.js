const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routeClient = require("./routes/index.route.js");
const db = require('./config/database-connect.js');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

routeClient(app);

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})


