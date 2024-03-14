document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    const homeLink = document.getElementById('homeLink');
    const content = document.getElementById('content');


    toggleButton.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
    });

    document.getElementById('homeLink').addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작 방지
        content.innerHTML = '<img src="home.jpg" style="max-width:30%; height:auto; display:block; margin:100px auto;">';
    });

    // "About" 링크에 대한 이벤트 리스너
    document.getElementById('about').addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작 방지
        content.innerHTML = '<img src="about.jpg" style="max-width:30%; height:auto; display:block; margin:100px auto;">';
    });

    // "Contact" 링크에 대한 이벤트 리스너
    document.getElementById('contact').addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작 방지
        content.innerHTML = '<img src="contact.jpg" style="max-width:30%; height:auto; display:block; margin:100px auto;">';
    });

    // "FAQ" 링크에 대한 이벤트 리스너
    document.getElementById('faq').addEventListener('click', function(event) {
        event.preventDefault(); // 링크의 기본 동작 방지
        content.innerHTML = '<img src="faq.png" style="max-width:30%; height:auto; display:block; margin:100px auto;">';
    });
});