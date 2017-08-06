const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

//Tools import
const {supplyDb} = require('./tools/supplyDb');

//Route Imports
const shopRouter = require('./routes/shop');

let handlebars = exphbs.create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname:'handlebars'
});

//Models
const Product = require('./models/product');

const port = process.env.PORT || 3000;

let app = express();

//Mongoose connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ricecake');

//Middlewares to use
app.use(bodyParser.json());

//Serving static files
app.use(express.static('views'));
app.use(express.static('public'));

//Views setup
app.set('views', path.join(__dirname, 'views'));

//View Engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Routes
app.use('/shop', shopRouter);

app.get('/', (req, res) => {
    // supplyDb();
    let query = {
        main : true
    };

    Product.find(query, (err, result)=>{
        if(err) throw err;

        console.log('retrieved from db')
        console.log(result)

        let mainProdArr = result;

        res.render('./index', {
            mainProdArr,
        })
    })
});

app.listen(port, ()=>{
    console.log(`Server has started at port ${port}`)
});

