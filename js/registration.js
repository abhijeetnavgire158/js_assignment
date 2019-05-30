var registration = (function(){
    var loggedInUser = null;
    
    var checkGenderSelected = function(gender) {
        var isSelected = false;
        gender.forEach(function(element) {      
            if (element.checked) {
                isSelected = element.value;
            }          
        });

        return isSelected;
    }

    var previewProfileImage = function(event) {        
        var reader = new FileReader();
        reader.onload = function(){
            var previewProfilePic = document.getElementById('previewProfilePic');
            previewProfilePic.classList.remove('hidden');
            previewProfilePic.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    //registration form validation
    var validate = function() {
        var userName = document.getElementById('username');
        var password = document.getElementById('password');       

        var error = false;

        if (userName.value === '') {
                document.getElementById('usernameError').innerHTML = "Username is required.";
                document.getElementById('usernameError').style.display = 'block';
                error =true;
        } else {
            if (localStorage.getItem(userName.value) !== null) {
                document.getElementById('usernameError').innerHTML = "Username is already taken.";
                document.getElementById('usernameError').style.display = 'block';
                error =true;
            } else {
                document.getElementById('usernameError').innerHTML = "";
                document.getElementById('usernameError').style.display = 'none';
            }
        }

        if (password.value === '') {
            document.getElementById('passwordError').innerHTML = "Password is required.";
            document.getElementById('passwordError').style.display = 'block';
            error =true;
        } else {
            document.getElementById('passwordError').innerHTML = "";
            document.getElementById('passwordError').style.display = 'none';
        }

        if (basicFieldValidation() === true) {
            error = true;
        }        

        return !error;
    }

    //Basic field validation . this method is also reuse while edit profile
    var basicFieldValidation = function() {
        var firstName = document.getElementById('firstname');
        var lastName = document.getElementById('lastname');
        var address = document.getElementById('address');
        var gender = document.getElementsByName('gender');        
        var previewProfilePic = document.getElementById('previewProfilePic');

        var onlyAlpha = new RegExp('^[a-zA-Z]*$');
        var error = false;

        if (firstName.value === '') {
            document.getElementById('firstnameError').innerHTML = "First name is required.";
            document.getElementById('firstnameError').style.display = 'block';
            error =true;
        } else {
            if (!onlyAlpha.exec(firstName.value)) {
                document.getElementById('firstnameError').innerHTML = "First name only accept letters.";
                document.getElementById('firstnameError').style.display = 'block';
                error =true;
            } else {
                document.getElementById('firstnameError').innerHTML = "";
                document.getElementById('firstnameError').style.display = 'none';
            }
        }

        if (lastName.value === '') {
            document.getElementById('lastnameError').innerHTML = "Last name is required.";
            document.getElementById('lastnameError').style.display = 'block';
            error =true;
        } else {
            if (!onlyAlpha.exec(lastName.value)) {
                document.getElementById('lastnameError').innerHTML = "Last name only accept letters.";
                document.getElementById('lastnameError').style.display = 'block';
                error =true;
            } else {
                document.getElementById('lastnameError').innerHTML = "";
                document.getElementById('lastnameError').style.display = 'none';
            }
        }

        if (!checkGenderSelected(gender)) {
            document.getElementById('genderError').innerHTML = "Gender is required.";
            document.getElementById('genderError').style.display = 'block';
            error =true;
        } else {
            document.getElementById('genderError').innerHTML = "";
            document.getElementById('genderError').style.display = 'none';
        }

        if (address.value === '') {
            document.getElementById('addressError').innerHTML = "Address is required.";
            document.getElementById('addressError').style.display = 'block';
            error =true;
        } else {
            document.getElementById('addressError').innerHTML = "";
            document.getElementById('addressError').style.display = 'none';
        }

        if (previewProfilePic.src === '') {
            document.getElementById('profilePicErr').innerHTML = "Profile pic is required.";
            document.getElementById('profilePicErr').style.display = 'block';
            error =true;
        } else {
            document.getElementById('profilePicErr').innerHTML = "";
            document.getElementById('profilePicErr').style.display = 'none';
        }

        return error;
    }

    //User Registration .userlist was saved on localstorage.
    var userRegistration = function() {
        var userList = {};

        if (validate() === false) {
            return false;
        }

        userList.userName = document.getElementById('username').value;
        userList.password = document.getElementById('password').value;
        userList.firstName = document.getElementById('firstname').value;
        userList.lastName = document.getElementById('lastname').value;
        userList.gender = checkGenderSelected(document.getElementsByName('gender'));
        userList.address = document.getElementById('address').value;
        userList.profilePic = document.getElementById('previewProfilePic').src;
     
        localStorage.setItem(userList.userName, JSON.stringify(userList));

        alert('User registration successfully.');
        location.href = '../js_assignment/login.html';
    }

    var getUserInfo = function() {
        loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log(loggedInUser);
        if (loggedInUser !== null) {
            var userData = JSON.parse(localStorage.getItem(loggedInUser.userName));
            
            document.getElementById('firstname').value = userData.firstName;
            document.getElementById('lastname').value = userData.lastName;
            document.getElementById('address').value = userData.address;
            document.getElementById(userData.gender).checked = true;
            document.getElementById('previewProfilePic').src = userData.profilePic;
            document.getElementById('previewProfilePic').style.display = 'block';
        } else {
            location.href = '../js_assignment/login.html';
        }
    }

    var userUpdateProfile = function() {
        if (loggedInUser !== null && basicFieldValidation() === false) {
            var updateUserData = JSON.parse(localStorage.getItem(loggedInUser.userName));
            updateUserData.firstName = document.getElementById('firstname').value;
            updateUserData.lastName = document.getElementById('lastname').value;
            updateUserData.gender = checkGenderSelected(document.getElementsByName('gender'));
            updateUserData.address = document.getElementById('address').value;
            updateUserData.profilePic = document.getElementById('previewProfilePic').src;

            localStorage.setItem(loggedInUser.userName, JSON.stringify(updateUserData));
            alert('Information updated successfully');
            location.href = '../js_assignment/profiles.html';
        } else {
            alert('Something went wrong. Information is not updated');
        }
    }
    
    return {
        previewProfileImage: previewProfileImage,
        validate: validate,
        userRegistration: userRegistration,
        userUpdateProfile: userUpdateProfile,
        getUserInfo: getUserInfo
    }
})();

