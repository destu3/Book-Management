// book object constructor
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.printDetails = function(){
    let readStatus = ""
        if (this.read == false){
            readStatus = "has not been read yet"
        }else{
            readStatus = "has been read"
        }
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`)
}

// book input selectors
const bookName = document.getElementById("name")
const bookAuthor = document.getElementById("author")
const numberOfPages = document.getElementById("pages")
const bookCompleted = document.getElementById("read")
const errorMessage = document.querySelector(".error")
const addBookBtn = document.getElementById("addBtn")
const bookCard = document.querySelector(".book-card")

// library array 
// dummy content
let book1 = new Book("Nightwork", "Nora Roberts", "798", true)
let book2 = new Book("The Summer Place", "Jennifer Weiner", "563", false)
let book3 = new Book("22 Seconds", "James Patterson", "638", true)
let book4 = new Book("Dream Town", "David Baldacci", "975", false)

let theLibrary = [
    book1,
    book2,
    book3,
    book4,
];

// adding books functionality
addBookBtn.addEventListener("click", addBooksToLibrary)

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
        populateBookGrid()
    }
}

const bookGrid = document.querySelector(".book-view") 


function populateBookGrid(){
        theLibrary.forEach((book) => {
        let bookCard = document.createElement("div")
        bookCard.classList.add("book-card")
        let bookImage = document.createElement("img")
        bookImage.src = "./images/TLOTR.jpg"
        bookImage.classList.add("book-image")
        let bookTitle = document.createElement("h4")
        bookTitle.textContent = book.title
        let bookAuthor = document.createElement("p")
        bookAuthor.textContent = book.author
        let pages = document.createElement("p")
        pages.textContent = book.pages
        let bookStatus = document.createElement("p")
        bookStatus.textContent = book.read
        let button = document.createElement("button")
        button.classList.add("delete-btn")
        button.setAttribute("data-library-index", theLibrary.indexOf(book))
        button.addEventListener("click", () => {
            deleteBook(button.getAttribute('data-library-index'))
        })
        let icon = document.createElement("i")
        icon.classList.add("fa-solid")
        icon.classList.add("fa-trash-can")
        button.appendChild(icon)
        bookCard.append(bookImage, bookTitle, bookAuthor, pages, bookStatus, button)
        bookGrid.appendChild(bookCard)
    })
}

window.addEventListener("DOMContentLoaded", populateBookGrid())

// delete book from library

function deleteBook(index){
    theLibrary.splice(index,1)
    refresh()
    populateBookGrid()
}

let deleteBtn = document.querySelectorAll(".delete-btn")

// deleteBtn.forEach(btn => {
//     btn.addEventListener("click", () => {
//         deleteBook(btn.getAttribute('data-library-index'))
//     })
// })

function refresh(){
    while (bookGrid.firstChild) {
        bookGrid.removeChild(bookGrid.firstChild);
    }
}