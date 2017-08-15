$('.add-to-cart').click(function (e) {
    e.preventDefault();
    let prodId = $(this).find('input').val();

    console.log('prodId is : ' + prodId);

    $.post('/api/shop/add', {
        prodId:prodId
    }, function (result) {
        console.log('added ' + result)
        $.post('/api/global/cartAmount',{}, function (result) {
            $('#number-in-cart').text(result.noOfItems)
        });
    })
});