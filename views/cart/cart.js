$('.incr-btn').click(function (e) {
    let totalPrice = 0;

    console.log($(this).hasClass('increase'))

    let curVal = $(this).parent().find('input').val()
    console.log(curVal)

    if($(this).hasClass('increase')){
        console.log(curVal)
        $(this).parent().find('input').val(parseInt(curVal) + 1)
    }else {
        $(this).parent().find('input').val(parseInt(curVal) - 1)
    }

    $('.item').each(function () {
        let eachPrice = $(this).find('.item-price').text();
        let orderAmount = $(this).find('.quantity').val();

        totalPrice += (parseInt(eachPrice) * parseInt(orderAmount))
    });

    $('.amount').text('\\' + totalPrice)
});