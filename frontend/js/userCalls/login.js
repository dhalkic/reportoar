$(document).ready(function () {
    const observer = {
        success: function (response) {
            alert('Login successful:', response);
            window.location.href = "events.html"
        },
        error: function (error) {
            alert('Login failed:', error);
        }
    };

    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        // Create a data object to send to the server
        const data = {
            email: email,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: 'https://php-backend-087ce0661fec.herokuapp.com/login',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                observer.success(response);
            },
            error: function (xhr, status, error) {
                observer.error(error);
            }
        });
    });
});
