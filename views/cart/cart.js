$('.incr-btn').click(function (e) {

    $('#checkout-btn').attr('disabled', 'disabled');

    let curVal = $(this).siblings('#quantity').val();

    if($(this).hasClass('increase')){
        $(this).siblings('#quantity').val(parseInt(curVal) + 1)
        console.log(curVal)
    }else if(curVal > 1){
        $(this).siblings('#quantity').val(parseInt(curVal) - 1)
        console.log(curVal)
    }

    updateTotal();

});

function updateTotal() {
    let totalPrice = 0;

    $('.item').each(function () {
        let eachPrice = $(this).find('.item-price').text();
        let orderAmount = $(this).find('.quantity').val();

        totalPrice += (parseInt(eachPrice) * parseInt(orderAmount))
    });

    $('.amount').text(totalPrice);
}

$('#update-cart-btn').click(function (e) {
    e.preventDefault();
    let cart = {};

    $('.item').each(function () {
        let eachId = $(this).find('#prod-id').val();
        let quantity = $(this).find('#quantity').val();
        console.log(eachId);

        cart[eachId] = quantity
    });

    $.post('/api/cart/update', cart, function (data) {
        console.log(data);

        $('#checkout-btn').removeAttr('disabled');
    })
});

$('.item-remove').click(function (e) {
    e.preventDefault();
    let selectedItem = $(this);

    let prodId = $(this).siblings('.item-details').find('#prod-id').val();

    $.post('/api/cart/remove', {remove:prodId}, function (result) {
        console.log(result)
        //remove from screen here
        selectedItem.parent('.item').remove();
        updateTotal();
    })
});

$('#quantity').change(function (e) {
    e.preventDefault();

    $('#checkout-btn').attr('disabled', 'disabled');
    updateTotal();
})