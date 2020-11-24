function init() {
    // General
    const body = document.body;
    const theme = localStorage.getItem('theme');

    // Desktop
    const darkButton = document.getElementById('theme-dark-button');
    const lightButton = document.getElementById('theme-light-button');
    var logoDesktop = document.getElementById('logo-desktop');
    var themeDesktop = document.getElementById('theme-desktop');
    var loginDesktop = document.getElementById('login-desktop');

    // Phone
    const darkButtonP = document.getElementById('theme-dark-button-p');
    const lightButtonP = document.getElementById('theme-light-button-p');
    var logoPhone = document.getElementById('logo-phone');
    var loginPhone = document.getElementById('login-phone');
    var menuPhone = document.getElementById('menu-phone');


    function lightMode() {
        // Desktop
        themeDesktop.src = 'assets/media/navbar/themeL.png';
        logoDesktop.src = 'assets/media/navbar/logoL.png'
        loginDesktop.src = 'assets/media/navbar/loginL.png';
        // Phone
        logoPhone.src = 'assets/media/navbar/logoL.png'
        loginPhone.src = 'assets/media/navbar/loginL.png';
        menuPhone.src = 'assets/media/navbar/menuL.png';
        try {
            body.classList.replace('dark', 'light');
        }
        catch {
            body.classList.add('light')
        }
        localStorage.setItem('theme', 'light');
    }

    function darkMode() {
        // Desktop
        themeDesktop.src = 'assets/media/navbar/theme.png';
        logoDesktop.src = 'assets/media/navbar/logo.png'
        loginDesktop.src = 'assets/media/navbar/login.png';
        // Phone
        logoPhone.src = 'assets/media/navbar/logo.png'
        loginPhone.src = 'assets/media/navbar/login.png';
        menuPhone.src = 'assets/media/navbar/menu.png';
        try {
            body.classList.replace('light', 'dark');
        }
        catch {
            body.classList.add('dark')
        }
        localStorage.setItem('theme', 'dark');
    }


    if (theme == 'light') {
        lightMode()
    } else {
        darkMode()
    }

    darkButton.onclick = () => {
        darkMode()
    };

    lightButton.onclick = () => {
        lightMode()
    };

    darkButtonP.onclick = () => {
        darkMode()
    };

    lightButtonP.onclick = () => {
        lightMode()
    };
}