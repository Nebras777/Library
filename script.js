var formIsHidden = true
var readVar = false

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
const readDiv = document.querySelector('#read')
const readSpan = document.querySelector('.read-span')
const grid = document.querySelector('.bookgrid')

addButton.addEventListener('click', displayForm) 
submitButton.addEventListener('click', submit)
readDiv.addEventListener('click', checkbox)

function displayForm() {
    if (formIsHidden) {
        clearInputs()
        formItem.style.opacity = '1'
        submitButton.style.opacity = '1'
        controlCursors()
        formIsHidden = false
    } else {
        formItem.style.opacity = '0'
        submitButton.style.opacity = '0'
        controlCursors()
        formIsHidden = true
        clearInputs()
    }
}

function clearInputs() {
    bookInput.value = authorInput.value = pagesInput.value = ''
    readVar = false
    readDiv.classList.remove('checked')
    readSpan.classList.add('read-span')
    readSpan.classList.remove('read-span-checked')
}

function controlCursors() {
    if (!formIsHidden) {
        formList.forEach((input) => {
            input.style.cursor = 'default'
        })
        readDiv.style.cursor = submitButton.style.cursor = 'default'
    } else {
        bookInput.style.cursor = authorInput.style.cursor = pagesInput.style.cursor = 'text'
        readDiv.style.cursor = submitButton.style.cursor = 'pointer'
    }
}

function submit() {
    if (bookInput.value != '' && authorInput.value != '' && pagesInput.value > 0 && pagesInput.value < 9999 && bookInput.value.length <= 40 && authorInput.value.length <= 20) {
        createDiv(bookInput.value, authorInput.value, pagesInput.value, readVar)
        formIsHidden = false
        displayForm()
    } else if (bookInput.value == '' || authorInput.value == '' || pagesInput.value == '') {
        alert('Please fill out all fields.')
    } else if (pagesInput.value < 0 || pagesInput.value > 9999) {
        alert('Cannot input negative or >9999 pages')
    } else if (bookInput.value.length > 40) {
        alert('No book name longer than 40 characters (including spaces)')
    } else if (authorInput.value.length > 20) {
        alert('No author name longer than 20 characters (including spaces)')
    }
}

function checkbox() {
    if (!readVar) {
        readDiv.classList.add('checked')
        readSpan.classList.remove('read-span')
        readSpan.classList.add('read-span-checked')
    } else {
        readDiv.classList.remove('checked')
        readSpan.classList.add('read-span')
        readSpan.classList.remove('read-span-checked')
    }
    readVar = !readVar
}

function createDiv(book, author, pages, read) {

    const newBook = new Book(book, author, pages, read)
    const bookDiv = document.createElement('div')
    const bookTitle = document.createElement('p')
    const authorTitle = document.createElement('p')
    const pagesNum = document.createElement('p')
    const bookReadDiv = document.createElement('div')
    const bookToggleDiv = document.createElement('div')
    const readLabel = document.createElement('p')
    const readToggle = document.createElement('div')
    const readToggleSpan = document.createElement('span')
    const deleteButton = document.createElement('button')

    bookDiv.classList.add('bookdiv')
    readToggle.classList.add('checkbox')
    readToggle.id = 'read-toggle'
    readToggleSpan.classList.add('read-span')
    bookReadDiv.id = "book-read-div"
    bookToggleDiv.id = "book-toggle-div"
    deleteButton.classList.add("delete-button")
    readToggle.style.border = '3px black solid'

    bookTitle.textContent = `\"${book}\"`
    authorTitle.textContent = `by ${author}`
    pagesNum.textContent = `${pages} Pages`
    readLabel.textContent = 'Read yet?'
    deleteButton.textContent = '✖'
    
    grid.appendChild(bookDiv)
    bookDiv.appendChild(bookTitle)
    bookDiv.appendChild(authorTitle)
    bookDiv.appendChild(bookReadDiv)
    bookReadDiv.appendChild(pagesNum)
    bookReadDiv.appendChild(bookToggleDiv)
    bookToggleDiv.appendChild(readLabel)
    bookToggleDiv.appendChild(readToggle)
    readToggle.appendChild(readToggleSpan)
    bookDiv.appendChild(deleteButton)

    if (newBook.isRead) {
        readToggle.classList.add('checked')
        readToggleSpan.classList.remove('read-span')
        readToggleSpan.classList.add('read-span-checked')
    } else {
        readToggle.classList.remove('checked')
        readToggleSpan.classList.add('read-span')
        readToggleSpan.classList.remove('read-span-checked')
    }

    readToggle.addEventListener('click', () => {
            if (!newBook.isRead) {
                readToggle.classList.add('checked')
                readToggleSpan.classList.remove('read-span')
                readToggleSpan.classList.add('read-span-checked')
            } else {
                readToggle.classList.remove('checked')
                readToggleSpan.classList.add('read-span')
                readToggleSpan.classList.remove('read-span-checked')
            }
            newBook.isRead = !newBook.isRead
        })

    deleteButton.addEventListener('click', () => {
        grid.removeChild(bookDiv)
    })
}