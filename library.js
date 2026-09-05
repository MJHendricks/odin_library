const myLibrary = [];

const button = document.createElement("button");
button.textContent = "New Book";
button.addEventListener("click", () => createPopup());
document.body.appendChild(button);

//flexbox to display the books nicely 
const bookDisplay = document.createElement("div");
bookDisplay.classList.add("library");
document.body.appendChild(bookDisplay);


function Book(name,read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.checkbox = read;
}

function addBookToLibrary(name,read) {
    const newBook = new Book(name,read);
    myLibrary.push(newBook);
    bookDisplay.replaceChildren();
    displayBook()
}

function displayBook() {
    for (const book of myLibrary) {
        const bookCover = document.createElement("div");
        bookCover.classList.add("cover");
        bookCover.textContent = book.name;
        bookDisplay.appendChild(bookCover);

        const readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        readCheckbox.classList.add("checkbox");
        //to permanently change the status if user changes read status after book is created.
        readCheckbox.addEventListener("change", () => {
            if (readCheckbox.checked) {
                book.checkbox = true;
            }
            else {
                book.checkbox = false;
            }
        });

        if (book.checkbox) {
            readCheckbox.checked = true;
        }
        bookCover.appendChild(readCheckbox);

        const readText = document.createElement("label");
        readText.textContent = "Read";
        bookCover.appendChild(readText);
        readText.classList.add("checkboxText");

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


function createPopup() {
    const overlay = document.createElement("div");
    overlay.classList.add("form");
    const content = document.createElement('div');
    content.classList.add('form-content');

    const form = document.createElement('form');

    const title = document.createElement('h3');
    title.textContent = 'Add New Book';

    const name = document.createElement('h4');
    name.textContent = 'Book Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;

    const read = document.createElement('h4');
    read.textContent = 'Read?';
    const readBtn = document.createElement('input');
    readBtn.type = 'checkbox';

    const gap = document.createElement('h4');
    // gap.textContent = ' ';
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';

    form.appendChild(title);
    form.appendChild(name);
    form.appendChild(nameInput);
    form.appendChild(read);
    form.appendChild(readBtn);
    form.appendChild(gap);
    form.appendChild(submitBtn);

    content.appendChild(form);
    overlay.appendChild(content);

    // Append the complete overlay stack to the body
    document.body.appendChild(overlay);

    //submit form , e.preventdefault is to stop page refresh 
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        addBookToLibrary(nameInput.value,readBtn.checked);
        overlay.remove();
    }
    );

    // close the popup when clicking the bg
    overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}