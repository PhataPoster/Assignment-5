const signInBtn = document.getElementById('signin-btn');
signInBtn.addEventListener('click', function() {
    // console.log(signInBtn)
    const usernameInput = document.getElementById('user-name');
    const passwordInput = document.getElementById('password');

    if (usernameInput.value === 'admin' && passwordInput.value === 'admin123') {
        // Redirect to the home page
        window.location.href = 'index.html';
    }
    else {
        alert('Invalid credentials. Please try again.');
    }
});