class RegistrationRequestBuilder {
    constructor() {
        this.request = new XMLHttpRequest();
    }

    setMethod(method) {
        this.request.open(method, 'https://php-backend-087ce0661fec.herokuapp.com/register', true);
        return this;
    }

    setContentType(contentType) {
        this.request.setRequestHeader('Content-Type', contentType);
        return this;
    }

    setPayload(payload) {
        this.request.send(payload);
        return this;
    }

    setOnReadyStateChange(callback) {
        this.request.onreadystatechange = callback;
        return this;
    }

    build() {
        return this.request;
    }
}

$(document).ready(function () {
    let isRegistrationSuccess = false; 

    const observer = {
        success: function (response) {
            if (isRegistrationSuccess) {
                alert('Registration successful:', response);
                window.location.href = "login.html";
            }
        },
        error: function (error) {
            if (!isRegistrationSuccess) {
                alert('Registration failed:');
                isRegistrationSuccess = true;
            }
        }
    };

    // Event handler for the registration form submission
    $('form').on('submit', function (event) {
        event.preventDefault();

        // Get form input values
        const firstName = $('#name').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#password').val();

        if (firstName === '') {
            console.log('First name is required');
            return;
        }

        // Create a data object to send to the server
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        // Use the builder to construct the registration request
        var request = new RegistrationRequestBuilder()
            .setMethod('POST')
            .setContentType('application/json')
            .setPayload(JSON.stringify(data))
            .setOnReadyStateChange(function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    observer.success(request.responseText);
                } else {
                    observer.error(request.statusText);
                }
            })
            .build();

        // Send the request
        request.send();
    });
});
