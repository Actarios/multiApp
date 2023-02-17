document.addEventListener('DOMContentLoaded', function() {

    let todoList = document.querySelector('.todo_list')

    function refreshNums() {
        let todoListNum = document.querySelectorAll('.todo_item_num')

        todoListNum.forEach((item, index) => {
            item.textContent = index + 1
        })
    }
    refreshNums()

    // 1 Filter

    todoList.addEventListener('click', (event) => {
        let todoItems = document.querySelectorAll('.todo_item'),
            currentParent = event.target.parentElement

        
        if (event.target.matches('.todo_item_value')) {
            
            if (currentParent.matches('.active')) {
                currentParent.classList.remove('active')
            } else {
                for (let elem of todoItems) {
                    elem.classList.remove('active')
                }
                currentParent.classList.add('active')
            }
        }
    })

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

    let todoFilterWrap = document.querySelector('.todo_filter_wrap')

    todoFilterWrap.addEventListener('mouseover', () => {
        todoFilterWrap.classList.add('hover')
        todoFilter.disabled = false
    })
    todoFilterWrap.addEventListener('mouseout', () => {
        if (todoFilter.value == '') {
            todoFilter.disabled = true
            todoFilterWrap.classList.remove('hover')
        }
    })

    // 2 Adding new task

    const addTodoBtn = document.getElementById('addTodoBtn')

    class Task {
        constructor(title, desc, deadline) {
            this.title = title
            this.desc = desc
            this.deadline = deadline
            this.pending = false
        }
    }

    let workingTasks = []
    let completedTasks = []

    addTodoBtn.addEventListener('click', () => {
        showPopup()
    })

    function createListPoint({title, desc, date}) {
        let todoItem = document.createElement('li'),
            todoInnerContent = `
                <div class="todo_item_num"></div>
                <input class="todo_item_value" type="text" value="${title}" disabled>
                <div class="todo_item_wrap">
                    <div class="todo_item_inner">
                        <span>Крайний срок выполнения:</span>
                        <span class="todo_item_date">${date}</span>
                        <div class="todo_item_desc">${desc}</div>
                    </div>
                </div>`

        todoItem.classList.add('todo_item')
        todoItem.innerHTML = todoInnerContent
        todoList.appendChild(todoItem)

        let result = new Task(title, desc, date)
        workingTasks.push(result)
        refreshNums()
    }

    let initialTasks = [
        {
            title: 'Покормить кота',
            desc: 'Только качественный корм, чтобы котик был доволен.',
            date: '2022-02-13'
        },
        {
            title: 'Проверить почту',
            desc: 'А вдруг прислали что-то важное?',
            date: '2022-02-13'
        },
        {
            title: 'Погладить кота',
            desc: 'Кот сам себя не погладит.',
            date: '2022-02-13'
        }
    ]

    createListPoint(initialTasks[0])
    createListPoint(initialTasks[1])
    createListPoint(initialTasks[2])

    console.log(workingTasks)
    

    // Changing tasks

    let changeTodo = document.querySelector('#changeTodo')
    let saveChangesTodo = document.querySelector('#saveChangesTodo')

    changeTodo.addEventListener('click', function() {
        console.log(workingTasks)
        // let todoItemsValue = document.querySelectorAll('.todo_item_value')

        // todoItemsValue.forEach(elem => elem.disabled = false)
        // this.classList.add('hide')
        // saveChangesTodo.classList.remove('hide')
        // todoList.classList.remove('green-light')
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
        if (event.target.matches('.todo_tabs_item')) {
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
        } 
    })

    // Popup

    const body = document.querySelector('body')
    let overlay = document.createElement('div')
    let popup = document.querySelector('.todo_popup')
    let close = document.querySelector('.close')

    const overlayClass = ['overlay', 'hide']
    overlay.classList.add(...overlayClass)
    body.appendChild(overlay)

    function showPopup() {
        overlay.classList.remove('hide')
        popup.classList.remove('hide')
    }

    function hidePopup() {
        overlay.classList.add('hide')
        popup.classList.add('hide')
    }

    close.addEventListener('click', hidePopup)
    overlay.addEventListener('click', hidePopup)


    let formName = document.getElementById('tpf_name'),
        formDate = document.getElementById('tpf_date'),
        formDesc = document.getElementById('tpf_desc'),
        formAdd = document.getElementById('tpf_add'),
        formClear = document.getElementById('tpf_clear')

    function clearForm() {
        formName.value = ''
        formDate.value = ''
        formDesc.value = ''
    }

    formAdd.addEventListener('click', (event) => {
        event.preventDefault()

        if (formName.value !== '' && formClear.value !== '') {
            let task = {
                title: formName.value,
                date: formDate.value,
                desc: formDesc.value
            }
            createListPoint(task)
            hidePopup()
            clearForm()  
        }
    })

    formClear.addEventListener('click', clearForm)

})