let cart = JSON.parse(_cart);
let products = JSON.parse(_products);
let clientCart = {};
let quantityDiff = {};

$(document).ready(function () {
    listenToClassChangeAddressForm();
    quantityDiff = quantityChanger(cart, clientCart);
    let cartKeys = Object.keys(cart);

    for (let index in cartKeys) {
        clientCart[cartKeys[index]] = 0;
    }
    clientCart = updateQuantities(clientCart);
});

function resetTabOrder() {
    $('.address-tab').each(function (index, object) {
        let innerClass = $(object).find('a');
        console.log(innerClass);
        innerClass.attr('href', `#tab${index + 1}`);
        innerClass.text(`주소 ${index + 1}`)
    });

    $('.tab-pane').each(function (index, object) {
        $(object).attr('id', `tab${index + 1}`);
    })
}

//Add address tab
$('#more-address-btn').click(function (e) {
    e.preventDefault();

    listenToClassChangeAddressForm();

    let navTab = $('.address-tab:first').clone().removeClass('active')[0];
    $(navTab).find('a').attr('aria-expanded', false);
    let tabPanel = $('.tab-pane:first').clone().removeClass('active', 'in')[0];

    $(tabPanel).find('.form-control').each(function (index, object) {
        console.log(object);
        $(object).val('');
        $(object).parent('.form-element').removeClass('valid error');
    });

    $('.nav-tabs').append(navTab);
    $('.tab-content').append(tabPanel);

    resetTabOrder();
    quantityDiff = quantityChanger(cart, clientCart);

    $(this).prop('disabled', true);
    $(this).removeClass('btn-primary').addClass('btn-default');
});

// $('.address-tab').click(function (e) {
//     $(this).siblings('.address-tab').each(function (index, sibling) {
//         $(sibling).removeClass('active');
//         $(sibling).find('a').attr('aria-expanded', false).removeClass('active')
//     });
//     $(this).addClass('active');
//     $(this).find('a').attr('aria-expanded', true).addClass('active');
// });

$('#save-address-btn').click(function (e) {
    e.preventDefault();
    let wrongCounts = 0;

    $('.address-form').each(function (index, object) {
        if (!$(object).parent('.form-element').hasClass('valid')) {
            wrongCounts += 1;
        }
        if (!($(object).val() > 0)) {
            $(object).parent('.form-element').addClass('error')
        }
    });

    if (wrongCounts === 0) {
        //call api
        console.log('valid');

        let reqBody = [];

        $('.tab-pane').each(function (index, object) {
            let curObject = $(object);

            let firstName = curObject.find('.firstName').val();
            let lastName = curObject.find('.lastName').val();
            let address = curObject.find('.google-map-address').val();
            let postCode = curObject.find('.post-code').val();
            let phoneNumber = curObject.find('.phone-number').val();
            let frontendId = curObject.attr('id');
            let products = [];

            $(curObject).find('.product-container').each((productIndex, eachProduct)=>{
                let prodObject = {};
                let prodId = $(eachProduct).find('.prod-id').val();
                let prodQuant = $(eachProduct).find('.quantity').val();

                prodObject['productId'] = prodId;
                prodObject['quantity'] = prodQuant;

                products.push(prodObject);
            });

            let eachBody =
                {
                    frontendId: frontendId,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    postCode: postCode,
                    phoneNumber: phoneNumber,
                    products:products
                };
            reqBody.push(eachBody);
        });

        $.post('/api/cart/checkout/update_address', {reqBody}, function (returnResult) {
            console.log(returnResult);
            $('#more-address-btn').prop('disabled', false);
            $('#more-address-btn').removeClass('btn-default').addClass('btn-primary');
        });

    } else {
        //display warning
    }
});

function listenToClassChangeAddressForm() {
    $('.address-form').each(function (index, object) {
        $(object).on('input', function () {
            if (!$.trim($(object).val())) {
                $(object).parent('.form-element').removeClass('valid').addClass('error')
            } else {
                $(object).parent('.form-element').removeClass('error').addClass('valid')
            }
        })
    });
}

function quantityChanger(session, client) {
    $('.incr-btn').click(function (e) {
        e.preventDefault();

        let curQuantity = $(this).siblings('.quantity').val();

        if ($(this).hasClass('decrease')) {
            if (curQuantity > 0) {
                $(this).siblings('.quantity').val(parseInt(curQuantity) - 1);
            }
        } else {
            $(this).siblings('.quantity').val(parseInt(curQuantity) + 1)
        }

        clientCart = updateQuantities(clientCart);
        console.log(clientCart);

        let changedQuantity = compareSessionAndClient(session, client);

        alertClientSessionDiff(changedQuantity, products);

        return changedQuantity
    });
}

function updateQuantities(arbCart) {
    let cartKeys = Object.keys(arbCart);

    for(let index in cartKeys){
        let curItem = cartKeys[index];

        arbCart[curItem] = 0;
    }

    $('.tab-content').each(function (index, tabContent) {
        $(tabContent).find('.product-container').each(function (productContainerIndex, productContainer) {
            let curProdId = $(productContainer).find('.prod-id').val();
            let prodQuantity = $(productContainer).find('.quantity').val();
            arbCart[curProdId] += parseInt(prodQuantity);
        })
    });

    return arbCart;
}

function compareSessionAndClient(session, client) {
    let prodKeys = Object.keys(session);
    let quantDiff = {};

    for(let index in prodKeys){
        let curKey = prodKeys[index];

        if(client[curKey] - session[curKey] !== 0){
            quantDiff[curKey] = client[curKey] - session[curKey];
        }
    }
    console.log(quantDiff);
    return quantDiff;
}

function alertClientSessionDiff(differenceObj, products) {
    let prodIds = Object.keys(differenceObj);
    let alerText = '장바구니에 넣으신 떡보다 주소에 배정하신 떡이 더 많습니다. 초과되는 만큼 장바구니에 추가할까요? \n';
    
    for (let index in prodIds){
        let curProd = prodIds[index];
        
        alerText += `${products[curProd]} ${differenceObj[curProd]}개 \n`
    }
    $('#quant-diff-alert').remove('p');
    $('#quant-diff-alert').append(`<p>${alerText}</p>`) .show({})
}