async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username_signup').value.trim();
    const email = document.querySelector('#email_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
           await document.location.replace('/');
        } else {
            alert(`${response.statusText}
            Make sure your password is 8 characters.
            If your password is the correct length,
            try a different username.`);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);