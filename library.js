const myLibrary = [];

//flexbox to display the books nicely 
const bookDisplay = document.createElement("div");
bookDisplay.classList.add("library");
document.body.appendChild(bookDisplay);

// this needs to submit the form which adds the new book somehow
const button = document.createElement("button");
button.textContent = "Submit";
document.body.appendChild(button);

function Book(name) {
    this.id = crypto.randomUUID();
    this.name = name;

    function printBook() {
        return this.name;
    }
}

function addBookToLibrary(name) {
    const newBook = new Book(name);
    myLibrary.push(newBook);
}

function displayBook() {
    for (const book of myLibrary) {
        const bookCover = document.createElement("div");
        bookCover.classList.add("cover");
        bookCover.textContent = book.name;
        bookDisplay.appendChild(bookCover);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("removeButton");
        removeButton.addEventListener("click", () => {

            //remove book by ID, just in case user enters books with the same name
            const removeID = book.id;
            const index = myLibrary.findIndex(book => book.id === removeID);
            myLibrary.splice(index, 1);

            //these next two lines update the display considering theres no persistant storage.
            bookDisplay.replaceChildren();
            displayBook();
        })
        bookCover.appendChild(removeButton);
    }
}



addBookToLibrary("hello");
addBookToLibrary("test");
addBookToLibrary("hello");
addBookToLibrary("test");
addBookToLibrary("hello");
addBookToLibrary("test");
displayBook();

//next i need to add a "read" toggle, then fix up the form