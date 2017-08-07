$('#register-form').validate({
    rules:{
        password: {
            required: true,
            minlength: 8,
            maxlength: 16
        },
        repeat_password: {
            equalTo: "#password",
            minlength: 8,
            maxlength: 16
        }
    },
    submitHandler: function (form) {
        form.submit()
    }
});

$('#login-form').validate({
    rules:{
        password: {
            required: true,
            minlength: 8,
            maxlength: 16
        },
    },
    submitHandler: function (form) {
        form.submit()
    }
});