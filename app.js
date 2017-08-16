const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const saltRounds = 10;
const https = require('https');
const hbs = require('handlebars');
const httpsOptions = {
    key : fs.readFileSync('example.key'),
    cert : fs.readFileSync('example.crt')
};

//Tools import
const {supplyDb} = require('./tools/supplyDb');

//Route Imports
const shopRouter = require('./routes/shop');
const loginRouter = require('./routes/login');
const cartRouter = require('./routes/cart');
const accRouter = require('./routes/account');
const verifyemailRouter = require('./routes/verify-email');
const aboutRouter = require('./routes/about');
const galleryRouter = require('./routes/gallery');
const blogRouter = require('./routes/blog');
const contactsRouter = require('./routes/contacts');
const faqRouter = require('./routes/faq');

//API Imports
const shopApi = require('./routes/api/shop');
const cartApi = require('./routes/api/cart');
const globalApi = require('./routes/api/global');
const loginApi = require('./routes/api/login');

let handlebars = exphbs.create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname:'handlebars'
});

//Models
const Product = require('./models/product');
const User = require('./models/user');

//Passport Configuration
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect Email.' });
            }

            let hash = user.password;

            bcrypt.compare(password, hash, (err, response)=>{
                if(response === true){
                    return done(null, user._id)
                }else {
                    return done(null, false, {message: 'Incorrect Password'});
                }
            });
        });
    }
));

passport.use(new FacebookStrategy({
        clientID: 1238693662908135,
        clientSecret: 'c8d05e564280b36575ab3459a4164b0a',
        callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.email[0].value }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect Email.' });
            }

            let hash = user.password;

            bcrypt.compare(password, hash, (err, response)=>{
                if(response === true){
                    return done(null, user._id)
                }else {
                    return done(null, false, {message: 'Incorrect Password'});
                }
            });
        });
    }
));

const port = process.env.PORT || 3000;

let app = express();

//Mongoose connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ricecake');

//Middlewares to use
app.use(session({
    secret: 'asdpfoiuenmvawv',
    store: new MongoStore({
        mongooseConnection : mongoose.connection
    }),
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
app.use('/login', loginRouter);
app.use('/cart', cartRouter);
app.use('/account', accRouter);
app.use('/verify-email', verifyemailRouter);
app.use('/about', aboutRouter);
app.use('/gallery', galleryRouter);
app.use('/blog', blogRouter);
app.use('/contacts', contactsRouter);
app.use('/faq', faqRouter);

//API routes
app.use('/api/shop', shopApi);
app.use('/api/cart', cartApi);
app.use('/api/global', globalApi);
app.use('/api/login', loginApi);

app.use((req, res, next)=>{
    res.locals.login = req.isAuthenticated();
    // res.locals.session = req.session;
    console.log('current user is');
    console.log(req.user);
    next();
});

app.get('/', (req, res) => {
    // supplyDb();

    // let password = 'password123';
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     if(err) throw err;
    //
    //     let email = 'jihochoi1123@gmail.com'
    //     password = hash;
    //
    //     let user = new User ({
    //         email,
    //         password
    //     });
    //
    //     user.save((err, result) => {
    //         console.log('added')
    //     })
    // });


    let query = {
        main : true
    };

    Product.find(query, (err, result)=>{
        if(err) throw err;


        let mainProdArr = result;

        res.render('./index', {
            mainProdArr,
        })
    })
});

https.createServer(httpsOptions, app).listen(port, ()=>{
    console.log(`server listening at ${port}`)
});

hbs.registerHelper('currentOrNot', (index)=>{
    if(index === 0){
        return 'current'
    }else{
        return
    }
});

//
// app.listen(port, ()=>{
//     console.log(`Server has started at port ${port}`)
// });