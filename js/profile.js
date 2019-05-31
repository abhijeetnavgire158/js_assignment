var userProfile = (function(){
    var userData = {};

    //Get LoggedInUser information from localstorage with the key "loggedInUser"
    var getLoggedInUserInfo = function() {
        var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log(loggedInUser);
        if (loggedInUser !== null) {
            userData = JSON.parse(localStorage.getItem(loggedInUser.userName));
            
            document.getElementById('loggedInUserName').innerHTML = userData.userName;
            document.getElementById('userProfilePic').src = userData.profilePic;
        } else {
            location.href = '../js_assignment/login.html';
        }
        
        return userData;
    }

    userData = getLoggedInUserInfo();

    var userLogout = function() {
        localStorage.removeItem('loggedInUser');
        location.href = '../js_assignment/login.html';
    }

    var getUserList = function () {
        var tbl = document.createElement("table");
        tbl.setAttribute("class", "table");
        var tblBody = document.createElement("tbody");

        for(var index = 0; index < localStorage.length; index++) {
            console.log(localStorage.key(index));
            if (localStorage.key(index) !== '') {            
                let userInfo = JSON.parse(localStorage.getItem(localStorage.key(index)));
                if (typeof userInfo.firstName !== 'undefined') {
                    let tr = document.createElement('tr');

                    let td1 = document.createElement('td');
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let td4 = document.createElement('td');
                    let td5 = document.createElement('td');

                    let text1 = document.createTextNode(userInfo.firstName);
                    let text2 = document.createTextNode(userInfo.lastName);
                    let text3 = document.createTextNode(userInfo.gender);
                    let text4 = document.createTextNode(userInfo.address);
                    let text5 = document.createTextNode(userInfo.lastName);
                    
                    td1.appendChild(text1);
                    td2.appendChild(text2);
                    td3.appendChild(text3);
                    td4.appendChild(text4);
                    td5.appendChild(text5);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    
                    document.getElementById('userListTBody').appendChild(tr);
                }
            }
        }
    }

    return {
        getLoggedInUserInfo: getLoggedInUserInfo,
        userLogout: userLogout,
        getUserList: getUserList
    }
}());

