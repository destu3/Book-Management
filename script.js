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
let theLibrary = [];


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

// viewing library
viewLibraryBtn.addEventListener("click", viewLibrary)

function viewLibrary(){
    console.log(theLibrary)
}