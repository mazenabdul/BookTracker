//Object Oriented Approach 

//Book Class: Represents a book object

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//UI Class: Handles UI Tasks (Displaying a book in the list, removing, showing an alert)

class UI {
    static displayBooks() {
        const storedBooks = [{
                title: 'Example Book 1',
                author: 'John Doe',
                isbn: '23234'

            },
            {
                title: 'Example Book 2',
                author: 'John Doe',
                isbn: '67297'
            }
        ]

        const books = storedBooks
        books.forEach((book) => {
            UI.addBookToList(book)
        })
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")

        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="" class = "btn btn-danger btn-sm delete">X</a></td>`

        list.appendChild(row)
    }

    static deleteBook(target) {
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, type) {
        const div = document.createElement("div")
        div.innerHTML = `<div class="alert alert-dismissible alert-${type}">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>${message}</strong>
    </div>`
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div, form)
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 3000)

    }
    static clearFields() {
        document.querySelector("#title").value = null
        document.querySelector("#author").value = null
        document.querySelector("#isbn").value = null
    }


}

//Store Class: Handles storage (local storage in the browser)

//Event: Display Current Books in the list

document.addEventListener("DOMContentLoaded", UI.displayBooks)

//Event: Add a book Using Form 

const form = document.querySelector("#book-form")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    //Get Form Values
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value

    //Validate 
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Empty fields detected. Please fill out all fields.", "danger")
    } else {
        //Instantiate a book object with above values

        const book = new Book(title, author, isbn)
        UI.addBookToList(book)
        UI.showAlert("Successfully added book!", "success")

        //Method to clear fields after submission
        UI.clearFields()
    }

})

//Event Remove a book using Event Propagation

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target)
    UI.showAlert("Book removed.", "primary")
})