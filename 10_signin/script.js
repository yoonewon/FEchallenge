function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    const correctUsername = 'user';
    const correctPassword = 'password';

    if (username === correctUsername && password === correctPassword) {
        showToast('로그인이 되었습니다');
    } else {
        messageElement.innerHTML = 'ID 혹은 PW가 잘못되었습니다';
        setTimeout(() => messageElement.innerHTML = '', 3000);
    }
}
