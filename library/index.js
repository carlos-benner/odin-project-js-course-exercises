let myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.isRead = () => {
        return this.read ? 'Read' : 'Not read yet';
    };
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages}, ${
            read ? 'read' : 'not read yet'
        }`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    const bookList = document.querySelector('.book-list');
    bookList.prepend(fillBookTemplate(book));
}

function fillBookTemplate(book) {
    const bookTemplate = document.querySelector('#book-template');
    let bookElement = bookTemplate.content.cloneNode(true).children[0];
    if (book.read) {
        bookElement.classList.add('book-read');
    }
    book.id = myLibrary.length + 100;
    bookElement.setAttribute('data-id', book.id);

    bookElement.querySelector('.book-read-label').textContent = book.isRead();

    bookElement.querySelector('.book-title').textContent = book.title
        ? book.title
        : 'No Title';
    bookElement.querySelector('.book-author').textContent = book.author
        ? book.author
        : 'Unknown';
    bookElement.querySelector('.book-pages').textContent = book.pages
        ? `${book.pages} pages.`
        : 'No pages info';

    return bookElement;
}

function toggleNewBookForm(open) {
    let button = document.querySelector('.add-book > button');
    let formDiv = document.querySelector('.add-book-form');
    if (open) {
        button.classList.add('hidden');
        formDiv.classList.remove('hidden');
    } else {
        formDiv.classList.add('hidden');
        button.classList.remove('hidden');
    }
}

function saveNewBook() {
    const errorMessagesElement = document.querySelector(
        'form > ul.error-messages'
    );
    const titleInput = document.querySelector('form #add-book-title');
    const authorInput = document.querySelector('form #add-book-author');
    const pagesInput = document.querySelector('form #add-book-pages');

    errorMessagesElement.innerHTML = '';
    if (titleInput.value.trim().length === 0) {
        let errorMessageTitle = document.createElement('li');
        errorMessageTitle.textContent = 'Title is required';
        errorMessagesElement.append(errorMessageTitle);
    }
    if (authorInput.value.trim().length === 0) {
        let errorMessageTitle = document.createElement('li');
        errorMessageTitle.textContent = 'Author is required';
        errorMessagesElement.append(errorMessageTitle);
    }
    if (pagesInput.value.trim().length === 0) {
        let errorMessageTitle = document.createElement('li');
        errorMessageTitle.textContent = 'Pages is required';
        errorMessagesElement.append(errorMessageTitle);
    }
    if (
        titleInput.value.trim().length === 0 ||
        authorInput.value.trim().length === 0 ||
        pagesInput.value.trim().length === 0
    ) {
        return;
    }

    let book = new Book(
        titleInput.value.trim(),
        authorInput.value.trim(),
        pagesInput.value,
        document.querySelector('form #add-book-read').checked
    );
    addBookToLibrary(book);
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

function toggleRead(el) {
    let bookEl = el.parentElement;
    let bookID = bookEl.getAttribute('data-id');
    let book = myLibrary.find((x) => x.id == bookID);
    book.read = !book.read;
    bookEl.querySelector('.book-read-label').textContent = book.isRead();
    bookEl.classList.toggle('book-read');
}

addBookToLibrary(new Book('The lord of the flies', 'Mark Sullivan', 432, true));
addBookToLibrary(new Book('Master of puppets', 'Metallica', 125));
