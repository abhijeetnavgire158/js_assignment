var todoList = (function() {
    var userData = userProfile.getLoggedInUserInfo();

    /*
    delete the todo from todos array using it's index & 
    reload the list (index was changed after delete)
    */
    function deleteTodoItem(index) {
        console.log(`Delete index : ${index}`);
        userData.todos.splice( parseInt( index ), 1 );
        localStorage.setItem(userData.userName,JSON.stringify(userData));
        showToDoList();
    }

    function editTodoItem(index) {
        console.log(index);
        location.href = `../js_assignment/create-todo.html?todoIndex=${index}`;
    }

    function markAsCompleted(index, value) {
        userData.todos[index].isCompleted = value;
        localStorage.setItem(userData.userName,JSON.stringify(userData));
        showToDoList();
    }

    var showToDoList = function() {
        if (typeof userData.todos !== 'undefined') {
            document.getElementById('todoList').innerHTML = '';        
            for(let index = 0; index < userData.todos.length; index++) {
                console.log(userData.todos[index].title);
                
                let tr = document.createElement('tr');
                if (userData.todos[index].isCompleted) {
                    tr.setAttribute('class', 'completed-task');
                }
                                
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');

                let markAsDoneIcon = document.createElement("span");
                
                markAsDoneIcon.innerHTML = `<i class="fa fa-check-circle ${(userData.todos[index].isCompleted) ? 'green-tick' : ''}" aria-hidden="true"></i>`;
                markAsDoneIcon.onclick = function() { 
                    //here we need to do opposite action so that we are pass the completed parameter as !
                    markAsCompleted(index, !userData.todos[index].isCompleted); 
                };

                let text1 = document.createTextNode(userData.todos[index].title);
                let text2 = document.createTextNode(userData.todos[index].date);
                let text3 = document.createTextNode(userData.todos[index].category.join());
                let text4 = document.createTextNode((userData.todos[index].isPublic) ? 'yes': 'no');
                let text5 = document.createElement("span");
                let editTodoIcon = document.createElement('span');
                editTodoIcon.innerHTML = '<i class="far fa-edit click-button"></i>';
                editTodoIcon.onclick = function() {
                    editTodoItem(index);
                }
                let deleteToDoIcon = document.createElement('span');
                deleteToDoIcon.innerHTML = '| <i class="fa fa-trash click-button" aria-hidden="true"></i>';
                deleteToDoIcon.onclick = function() { 
                    deleteTodoItem(index); 
                };

                text5.appendChild(editTodoIcon);
                text5.appendChild(deleteToDoIcon);

                td1.appendChild(markAsDoneIcon);
                td2.appendChild(text1);
                td3.appendChild(text2);
                td4.appendChild(text3);
                td5.appendChild(text4);
                td6.appendChild(text5);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                
                document.getElementById('todoList').appendChild(tr);
            }
        }
    }

    
    return {
        showToDoList: showToDoList
    }
}());