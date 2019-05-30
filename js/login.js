var userLogin = (function() {
    var loginErrorMessage = function() {       
        document.getElementById('loginError').innerHTML = "Sorry, we don't recognize this account.";
        document.getElementById('loginError').style.display = 'block';       
    }

    var authenticateUser = function() {
        var userName = document.getElementById('username').value;
        var password =document.getElementById('password').value;
        var userData = JSON.parse(localStorage.getItem(userName));
        
        if (userData !== null && userName !== '') {
            if(userData.userName === userName && userData.password === password) {                             
                var loggedInUser = {
                    userName : userData.userName,
                    loginTime: new Date()
                }

                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                location.href = '../js_assignment/profiles.html';
            }
        }
        loginErrorMessage();
    }

    return {
        authenticateUser: authenticateUser
    }
}());