const myLibrary = [];

function Book(name, ) {
    this.ID = crypto.randomUUID();
    this.name;
}

function addBookToLibrary(name) {
    const newBook = new Book(name);
    myLibrary.push(newBook);
}

function displayBook() {
    
}