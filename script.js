var formIsHidden = true;

class Book {
    constructor(name, author, pages, isRead) {
        this.name = name
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

const addButton = document.querySelector('#add')
const formItem = document.querySelector('form')
const formList = document.querySelectorAll('form > input')
const submitButton = document.querySelector('#submit')
const bookInput = document.querySelector('#book')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const readCheck = document.querySelector('#read')

addButton.addEventListener('click', displayForm) 

function displayForm() {
    if (formIsHidden) {
        formItem.style.opacity = '1'
        controlCursors()
        formIsHidden = false
    } else {
        formItem.style.opacity = '0'
        controlCursors()
        formIsHidden = true
    }
}

function clearInputs() {
    bookInput.value = authorInput.value = pagesInput.value = ''
    readCheck.checked = false
}

function controlCursors() {
    if (!formIsHidden) {
        formList.forEach((input) => {
            input.style.cursor = 'default'
        })
        readCheck.style.cursor = 'default'
    } else {
        bookInput.style.cursor = authorInput.style.cursor = pagesInput.style.cursor = 'text'
        readCheck.style.cursor = 'pointer'
    }
}