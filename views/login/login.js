$('#register-form').validate({
    rules:{
        password: {
            required: true,
            minlength: 8,
            maxlength: 16
        },
        repeat_password: {
            equalTo: "#repeat_password",
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

// $('#signup-submit-btn').click(function (e) {
//     e.preventDefault();
//
//     let email = $('#register-email').val();
//     let password = $('#register-password').val();
//
//     $.post('/api/login/new', {
//         email,
//         password
//     }, function (data) {
//         if(data.userExists){
//             console.log('user already exists')
//         }else if (data.userExists && data.accountCreated){
//             console.log('verification email has been sent')
//         }
//     })
// });