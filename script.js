// book object constructor
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleReadStatus = function(){
    if (this.read == "Completed"){
        this.read = "Not Completed"
    }
    else if(this.read == "Not Completed"){
        this.read = "Completed"
    }
}

// constants
const bookName = document.getElementById("name")
const bookAuthor = document.getElementById("author")
const numberOfPages = document.getElementById("pages")
const bookCompleted = document.getElementById("completed")
const errorMessage = document.querySelector(".error")
const addBookBtn = document.getElementById("addBtn")
const bookCard = document.querySelector(".book-card")
const bookGrid = document.querySelector(".book-view") 

// library array 
// dummy content
let book1 = new Book("Nightwork", "Nora Roberts", "798", "Not Completed")
let book2 = new Book("The Summer Place", "Jennifer Weiner", "563", "Completed")
let book3 = new Book("22 Seconds", "James Patterson", "638", "Not Completed")
let book4 = new Book("Dream Town", "David Baldacci", "975", "Completed")

let theLibrary = [
    book1,
    book2,
    book3,
    book4,
];

// adding books functionality
addBookBtn.addEventListener("click", addBooksToLibrary)


// functions
function populateBookGrid(){
        theLibrary.forEach((book) => {
        createBook(book)
    })
}

function deleteBook(index){
    theLibrary.splice(index,1)
    refresh()
    populateBookGrid()
}

function refresh(){
    while (bookGrid.firstChild) {
        bookGrid.removeChild(bookGrid.firstChild);
    }
}

function createBook(book){
    let bookCard = document.createElement("div")
    bookCard.classList.add("book-card")
    let bookImage = document.createElement("img")
    bookImage.src = "./images/cover-image.png"
    bookImage.classList.add("book-image")
    let bookTitle = document.createElement("h4")
    bookTitle.textContent = book.title
    let bookAuthor = document.createElement("p")
    bookAuthor.textContent = book.author
    let pages = document.createElement("p")
    pages.textContent = book.pages
    let bookStatus = document.createElement("p")
    bookStatus.textContent = book.read
    let deleteButton = document.createElement("button")
    // delete button
    deleteButton.classList.add("delete-btn")
    deleteButton.setAttribute("data-library-index", theLibrary.indexOf(book))
    deleteButton.addEventListener("click", () => {
        deleteBook(deleteButton.getAttribute('data-library-index'))
    })
    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa-solid", "fa-trash-can")
    // edit read status
    let editButton = document.createElement("button")
    editButton.classList.add("edit-btn")
    editButton.setAttribute("data-library-index", theLibrary.indexOf(book))
    editButton.addEventListener("click", () => {
        changeReadStatus(editButton.getAttribute('data-library-index'))
    })
    let editIcon = document.createElement("i")
    editIcon.classList.add("fa-solid", "fa-pencil")
    editIcon.title = "Change read status"
    editButton.appendChild(editIcon)
    deleteButton.appendChild(deleteIcon)
    bookCard.append(bookImage, bookTitle, bookAuthor, pages, bookStatus, deleteButton, editButton)
    bookGrid.appendChild(bookCard)
}

function addBooksToLibrary(){
    if(bookName.value.length == 0 || bookAuthor.value.length == 0 || numberOfPages.value.length == 0 || bookCompleted.value.length == 0){
        errorMessage.textContent = "Fill in all fields" 
        errorMessage.classList.remove("positive-e")
    }
    else{
        errorMessage.textContent = "Book successfully added" 
        errorMessage.classList.add("positive-e")
        let book = new Book(bookName.value, bookAuthor.value, Number(numberOfPages.value), bookCompleted.value)
        theLibrary.push(book)
        createBook(book)
    }
}

function changeReadStatus(bookIndex){
    theLibrary[bookIndex].toggleReadStatus()
    console.table(theLibrary[bookIndex])
    refresh()
    populateBookGrid()
}

// window loaded event
window.addEventListener("DOMContentLoaded", populateBookGrid())