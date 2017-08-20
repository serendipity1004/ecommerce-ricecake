$(document).ready(function () {
    listenToClassChangeAddressForm();
});

function resetTabOrder() {
    $('.address-tab').each(function (index, object) {
        let innerClass = $(object).find('a');
        console.log(innerClass)
        innerClass.attr('href', `#tab${index + 1}`);
        innerClass.text(`주소 ${index + 1}`)
    });

    $('.tab-pane').each(function (index, object) {
        $(object).attr('id', `tab${index + 1}`);
    })
}

//Add address tab
$('.add-address-btn').click(function (e) {
    e.preventDefault();

    let navTab = $('.address-tab:first').clone().removeClass('active')[0];
    let tabPanel = $('.tab-pane:first').clone().removeClass('active', 'in')[0];

    $(tabPanel).find('.form-control').each(function (index, object) {
        console.log(object)
        $(object).val('');
        $(object).parent('.form-element').removeClass('valid error');

    });

    $('.nav-tabs').append(navTab);
    $('.tab-content').append(tabPanel);

    resetTabOrder()
});

$('#more-address-btn').click(function (e) {
    e.preventDefault();

    listenToClassChangeAddressForm();

    $(this).prop('disabled', true);
    $(this).removeClass('btn-primary').addClass('btn-default');
});

$('#save-address-btn').click(function (e) {
    e.preventDefault();
    let wrongCounts = 0;

    $('.address-form').each(function (index, object) {
        if (!$(object).parent('.form-element').hasClass('valid')) {
            wrongCounts += 1;
        }
    });

    if (wrongCounts === 0) {
        //call api
        console.log('valid');
        $('#more-address-btn').prop('disabled', false);
        $('#more-address-btn').removeClass('btn-default').addClass('btn-primary');

        let reqBody = [];

        $('.tab-pane').each(function (index, object) {
            let curObject = $(object);

            let firstName = curObject.find('.firstName').val();
            let lastName = curObject.find('.lastName').val();
            let address = curObject.find('.google-map-address').val();
            let postCode = curObject.find('.post-code').val();
            let phoneNumber = curObject.find('.phone-number').val();
            let frontendId = curObject.attr('id');

            let eachBody =
                {
                    frontendId: frontendId,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    postCode: postCode,
                    phoneNumber: phoneNumber
                };
            reqBody.push(eachBody);
        });

        $.post('/api/cart/checkout/update_address', {reqBody}, function (returnResult) {
            console.log(returnResult);
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