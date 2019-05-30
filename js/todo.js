var todo = (function(){
    var todoIndex = null;

    var previewFile = function(event) {        
        var reader = new FileReader();
        reader.onload = function(){
            var previewProfilePic = document.getElementById('previewFile');            
            previewProfilePic.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    var isReminder = function() {
        document.getElementById('todoReminderDate').disabled = true;
        if (document.getElementById('todoReminder').checked) {            
            document.getElementById('todoReminderDate').disabled = false;
        }        
    }

    var validateToDo = function() {
        var todoTitle = document.getElementById('todoTitle');
        var todoDate = document.getElementById('todoDate'); 
        var todoReminder = document.getElementById('todoReminder').checked;      
        var todoReminderDate = document.getElementById('todoReminderDate');
        var doneCategory = document.getElementById('doneCategory').checked;
        var pendingCategory = document.getElementById('pendingCategory').checked;

        var validate =true;

        if (todoTitle.value === '') {
            document.getElementById('todoTitleError').innerHTML = 'To-Do title is required.'
            document.getElementById('todoTitleError').style.display = 'block';
            validate = false;
        } else {
            document.getElementById('todoTitleError').style.display = 'none';
        }

        if (todoDate.value === '') {
            document.getElementById('todoDateError').innerHTML = 'To-Do date is required.'
            document.getElementById('todoDateError').style.display = 'block';
            validate = false;
        } else {
            document.getElementById('todoDateError').style.display = 'none';
        }

        if (doneCategory === false && pendingCategory === false) {
            document.getElementById('todoCategoryError').innerHTML = 'Please select at least on category.';
            document.getElementById('todoCategoryError').style.display = 'block';
            validate = false;
        } else {
            document.getElementById('todoCategoryError').style.display = 'none';
        }

        if (todoReminder && todoReminderDate.value === '') {
            document.getElementById('todoReminderDateError').innerHTML = 'Reminder date is required.'
            document.getElementById('todoReminderDateError').style.display = 'block';
            validate = false;
        } else {
            document.getElementById('todoReminderDateError').style.display = 'none';
        }
        
        return validate;
    }

    var todoItem = (title, date, category, isReminder, reminderDate, isPublic, attached) => {
        return {
            title: title,
            date: date,
            category: category,
            isReminder: isReminder,
            reminderDate: reminderDate,
            isPublic: isPublic,
            attached: attached,
            isCompleted: false
        }
    }

    var createToDoList = function() {        
        var categories = [];
        var userData = userProfile.getLoggedInUserInfo();

        if (validateToDo() === false) {
            return false;    
        }

        if (userData.userName !== '') {
            var todoTitle = document.getElementById('todoTitle').value;
            var todoDate = document.getElementById('todoDate').value; 
            var todoReminder = document.getElementById('todoReminder').checked;      
            var todoReminderDate = document.getElementById('todoReminderDate').value;
            var doneCategory = document.getElementById('doneCategory').checked;
            var pendingCategory = document.getElementById('pendingCategory').checked;
            var isPublic = document.getElementById('todoIsPublic').checked;
            var todoAttach = document.getElementById('previewFile').src;           

            if (doneCategory) {
                categories.push('Done');
            }
            if (pendingCategory) {
                categories.push('Pending');
            }
            
            var todoTask = todoItem(todoTitle, todoDate, categories, todoReminder, todoReminderDate, isPublic, todoAttach);
            if (todoIndex === null) {
                if (typeof userData.todos === 'undefined') {
                    userData.todos = []; //initialise the todo array                   
                }
                userData.todos.push(todoTask);
            } else {
                userData.todos[todoIndex] = todoTask;
            }

            localStorage.setItem(userData.userName, JSON.stringify(userData));
            location.href = '../js_assignment/todo-list.html';
        }
    }

    var showData = function() {
        var urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('todoIndex');
        var userData = userProfile.getLoggedInUserInfo();
        var todoData = userData.todos[id];
        
        if (typeof todoData !== "undefined") {
            todoIndex = id;
            console.log(todoData);
            console.log(todoData.isReminder);
            document.getElementById('todoTitle').value = todoData.title;
            document.getElementById('todoDate').value = todoData.date; 
            document.getElementById('todoReminder').checked = todoData.isReminder; 
               
            document.getElementById('todoReminderDate').value = todoData.reminderDate;
            document.getElementById('doneCategory').checked = (todoData.category.indexOf('Done') !== -1);
            document.getElementById('pendingCategory').checked = (todoData.category.indexOf('Pending') !== -1);
            document.getElementById('todoIsPublic').checked = todoData.isPublic;
            document.getElementById('previewFile').src = todoData.attached;
            //document.getElementById('previewFile').style.display = 'block';

            isReminder(); //if is reminder true then we need to enable reminder-date in edit mode.

        }
    }
    showData();

    return {
        isReminder: isReminder,
        validateToDo: validateToDo,
        previewFile: previewFile,
        createToDoList: createToDoList
    }
}());