document.addEventListener('DOMContentLoaded', function() {

    let todoList = document.querySelector('.todo_list')

    function refreshNums() {
        let todoListNum = document.querySelectorAll('.todo_item_num')

        todoListNum.forEach((item, index) => {
            item.textContent = index + 1
        })
    }
    refreshNums()

    // Filter

    let todoFilter = document.querySelector('#todoFilter')

    todoFilter.addEventListener('input', function() {
        let todoItemsValue = document.querySelectorAll('.todo_item_value')
        for (let elem of todoItemsValue) {
            let textElem = elem.value.toLowerCase()
            let textInput = this.value.toLowerCase()

            if (textElem.match(textInput)) {
                elem.parentElement.classList.remove('hide')
            } else {
                elem.parentElement.classList.add('hide')
            }
        }
    })

    // Adding new task

    class Task {
        constructor(title, desc, deadline) {
            this.title = title
            this.desc = desc
            this.deadline = deadline
            this.pending = false
        }
    }

    let newTask = new Task('Погладить кота', 'Я люблю своего котика, причешу хвостик гладко', '2023-02-13')

    console.log(newTask)

    let addTodo = document.querySelector('#addTodo')

    addTodo.addEventListener('click', function() {
        let ans = prompt('Напишите текст задачи:', '')

        if (ans !== '' && ans !== null) {
            createListPoint(ans)
        } else {
            let exit = confirm('Вы уверены, что хотите выйти?', '')
            if (!exit) {
                let ans2 = prompt('Напишите текст задачи:', ans)
            }
        }
    })

    function createListPoint(text) {
        let newItem = document.createElement('li')
        let newItemNum = document.createElement('div')
        let newItemText = document.createElement('input')

        newItem.classList.add('todo_item')
        newItemNum.classList.add('todo_item_num')
        newItemText.classList.add('todo_item_value')

        newItem.appendChild(newItemNum)
        newItem.appendChild(newItemText)
        newItemText.type = 'text'
        newItemText.disabled = 'true'

        todoList.appendChild(newItem)
        newItemText.value = text
        refreshNums()
    }

    let changeTodo = document.querySelector('#changeTodo')
    let saveChangesTodo = document.querySelector('#saveChangesTodo')

    changeTodo.addEventListener('click', function() {
        this.hide()

        let todoItemsValue = document.querySelectorAll('.todo_item_value')

        todoItemsValue.forEach(elem => elem.disabled = false)
        this.classList.add('hide')
        saveChangesTodo.classList.remove('hide')
        todoList.classList.remove('green-light')
    })
    saveChangesTodo.addEventListener('click', function() {
        let todoItemsValue = document.querySelectorAll('.todo_item_value')

        todoItemsValue.forEach(elem => elem.disabled = true)
        this.classList.add('hide')
        changeTodo.classList.remove('hide')
        todoList.classList.add('green-light')
    })

    let deleteTodo = document.querySelector('#deleteTodo')
    let confirmDeleteTodo = document.querySelector('#confirmDeleteTodo')

    deleteTodo.addEventListener('click', function() {
        this.classList.add('hide')
        confirmDeleteTodo.classList.remove('hide')
        let todoItems = document.querySelectorAll('.todo_item')

        for (let elem of todoItems) { 
            let checkbox = document.createElement('input')
            checkbox.classList.add('for-delete')
            checkbox.type = 'checkbox'
            elem.appendChild(checkbox)
        }
    })
    confirmDeleteTodo.addEventListener('click', () => {
        let forDeleteItems = document.querySelectorAll('.for-delete')

        for (let elem of forDeleteItems) {
            if (elem.checked) {
                elem.parentElement.parentElement.removeChild(elem.parentElement)
            }
            elem.parentElement.removeChild(elem)
        }
        refreshNums()
        confirmDeleteTodo.classList.add('hide')
        deleteTodo.classList.remove('hide')
    })

    // Tabs

    let todoTabs = document.querySelector('.todo_tabs')
    let todoTabsItems = document.querySelectorAll('.todo_tabs_item')
    let todoTabContent = document.querySelectorAll('.todo_wrapper > div')

    function hideContentTab(n) {
        for (let i = n; i < todoTabContent.length; i++) {
            todoTabContent[i].classList.remove('show')
            todoTabContent[i].classList.add('hide')
        }
    }
    hideContentTab(1)

    todoTabs.addEventListener('click', (event) => {
        let current
        for (let i = 0; i < todoTabsItems.length; i++) {
            if (todoTabsItems[i] == event.target) {
                current = i
            }
        }
        hideContentTab(0)
        todoTabContent[current].classList.remove('hide')
        todoTabContent[current].classList.add('show')

        for (let elem of todoTabsItems) {
            elem.classList.remove('active')
        }
        todoTabsItems[current].classList.add('active')
    })
        
})