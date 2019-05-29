var todoList = (function() {
    var showToDoList = function() {
        userData = userProfile.getLoggedInUserInfo();
        console.log(userData);

        if (typeof userData.todo !== 'undefined') {        
            for(var index = 0; index < userData.todo.length; index++) {
                console.log(userData.todo[index].title);
                let tr = document.createElement('tr');

                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');

                let text1 = document.createTextNode(userData.todo[index].title);
                let text2 = document.createTextNode(userData.todo[index].date);
                let text3 = document.createTextNode(userData.todo[index].category.join());
                let text4 = document.createTextNode((userData.todo[index].isPublic) ? 'yes': 'no');
                let text5 = document.createTextNode('delete');
                
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
                
                document.getElementById('todoList').appendChild(tr);
            }
        }
    }

    return {
        showToDoList: showToDoList
    }
}());