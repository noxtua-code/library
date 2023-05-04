class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const library = (() => {
  const myLibrary = [];

  //   Dom
  const main = document.querySelector("main");
  const newBookForm = document.querySelector("#new-book-form");
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  // Bind events
  main.addEventListener("click", (e) => {
    removeBook(e);
    switchReadStatus(e);
  });
  newBookForm.addEventListener("submit", (e) => {
    _submitForm(e);
  });

  _render();

  function _render() {
    main.replaceChildren();
    myLibrary.forEach((key) => {
      _createBookCard(key);
    });
  }

  function _submitForm(e) {
    e.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, read.checked);

    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
  }

  function addBookToLibrary(bookTitle, bookAuthor, bookPages, readStatus) {
    const newBook = new Book(bookTitle, bookAuthor, bookPages, readStatus);
    myLibrary.unshift(newBook);
    _render();
  }

  function _appendBookDetails(newBookObject, bookList) {
    Object.keys(newBookObject).forEach((key) => {
      const bookDetail = document.createElement("li");

      if (key === "pages" && pages.value !== "") {
        bookDetail.textContent = `${newBookObject[key]} pages`;
      } else if (key === "read") {
        if (newBookObject[key]) {
          bookDetail.textContent = `Finished reading`;
        } else {
          bookDetail.textContent = `Not read yet`;
        }
      } else {
        bookDetail.textContent = newBookObject[key];
      }

      bookList.appendChild(bookDetail);
    });
  }

  function _createBookCard(newBookObject) {
    const newCard = document.createElement("div");
    newCard.className = "card";

    const bookDetailsList = document.createElement("ul");
    _appendBookDetails(newBookObject, bookDetailsList);

    const removeBookButton = document.createElement("button");
    removeBookButton.type = "button";
    removeBookButton.className = "remove-book-button";

    newCard.appendChild(removeBookButton);
    newCard.appendChild(bookDetailsList);
    main.appendChild(newCard);
    newCard.dataset.index = myLibrary.indexOf(newBookObject);
    newCard.tabIndex = 0;
    bookDetailsList.lastChild.tabIndex = 0;
  }

  function removeBook(e) {
    if (e.target.className === "remove-book-button") {
      myLibrary.splice(e.target.parentElement.dataset.index, 1);
      _render();
    }
  }

  function switchReadStatus(e) {
    if (e.target.lastChild && e.target.nodeName === "LI") {
      const bookIndex = e.target.parentElement.parentElement.dataset.index;
      if (myLibrary[bookIndex].read) {
        myLibrary[bookIndex].read = false;
      } else {
        myLibrary[bookIndex].read = true;
      }
    }
    _render();
  }

  return { addBookToLibrary, removeBook, switchReadStatus };
})();
