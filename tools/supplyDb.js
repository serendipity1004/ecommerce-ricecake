const Product = require('../models/product');
const User = require('../models/user');

const supplyDb = () => {
    //slider 1
    let name = '떡1';
    let category = 'type1';
    let price = 10000;
    let imgPath = '/img/hero-slider/01.jpg';
    let stock = 100;
    let main = true;

    let slider1 = new Product({
        name,
        category,
        price,
        imgPath,
        stock,
        main
    });

    slider1.save((err, result) => {
        if (err) throw err;

        console.log('added to database');
        console.log(result)
    });

    name = '떡2';
    price = 20000;
    imgPath = '/img/hero-slider/02.jpg';
    stock = 50;
    main = true;

    let slider2 = new Product({
        name,
        category,
        price,
        imgPath,
        stock,
        main
    });

    slider2.save((err, result) => {
        if (err) throw err;

        console.log('added to database');
        console.log(result);
    });

    name = '떡3';
    price = 30000;
    imgPath = '/img/hero-slider/02.jpg';
    stock = 10;
    main = true;

    let slider3 = new Product({
        name,
        category,
        price,
        imgPath,
        stock,
        main
    });

    slider3.save((err, result) => {
        if (err) throw err;

        console.log('added to database');
        console.log(result)
    });

    name = '떡4';
    price = 10000;
    imgPath = '/img/shop/th01.jpg';
    stock = 20;
    main = false;

    let product1 = new Product({
        name,
        category,
        price,
        imgPath,
        stock,
        main
    });

    product1.save((err, result) => {
        if (err)throw err;

        console.log('added to database');
        console.log(result);
    });

    for (let i = 2; i < 17; i++){
        name = `떡${i+3}`;
        price = 10000;
        imgPath = i < 10 ? `/img/shop/th0${i}.jpg` : `/img/shop/th${i}.jpg`;
        stock = 25;
        main = false;

        let product2 = new Product({
            name,
            category,
            price,
            imgPath,
            stock,
            main
        })

        product2.save((err, result) => {
            if (err) throw err;

            console.log('added to database');
            console.log(result)
        })
    }

};

module.exports = {
    supplyDb
};