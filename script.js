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
const viewLibraryBtn = document.getElementById("viewBtn")

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
    book4
];


// adding books functionality
addBookBtn.addEventListener("click", addBooksToLibrary)

function addBooksToLibrary(){
    if(bookName.value.length == 0 || bookAuthor.value.length == 0 || numberOfPages.value.length == 0 || bookCompleted.value.length == 0){
        errorMessage.textContent = "Fill in all fields" 
    }
    else{
        errorMessage.textContent = "" 
        let book = new Book(bookName.value, bookAuthor.value, Number(numberOfPages.value), bookCompleted.value)
        theLibrary.push(book)
    }
}

const bookGrid = document.querySelector(".book-view") 

function populateBookGrid(){
    let bookElement = theLibrary.map((book) => {
        return `<div class="book-card">
        <img src="./images/TLOTR.jpg" alt="book image" class="book-image">
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Completed: ${book.read}</p>
        </div>`
    })
    bookElement = bookElement.join("")
    bookGrid.innerHTML = bookElement
}

// viewing library
viewLibraryBtn.addEventListener("click", viewLibrary)

function viewLibrary(){
    console.log(theLibrary)
}

window.addEventListener("DOMContentLoaded", populateBookGrid())