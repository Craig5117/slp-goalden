document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "dismissible");
})

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/students');
        } else {
            alert(response.statusText);
        }
    }
}

// check id in template
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);