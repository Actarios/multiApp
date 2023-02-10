document.addEventListener('DOMContentLoaded', function() {

    let todoList = document.querySelector('.todo_list')

    function refreshNums() {
        let todoListNum = document.querySelectorAll('.todo_item_num')

        todoListNum.forEach((item, index) => {
            item.textContent = index + 1
        })
    }
    refreshNums()

    let todoFilter = document.querySelector('#todoFilter')
    let todoItemsValue = document.querySelectorAll('.todo_item_value')

    todoFilter.addEventListener('input', function() {
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

    let addTodo = document.querySelector('#addTodo')

    addTodo.addEventListener('click', function() {
        let ans = prompt('Напишите текст задачи:', '')

        if (ans !== '' && ans !== null) {
            createListPoint(ans)
        } else {
            alert('Подумайте ещё раз')
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
})