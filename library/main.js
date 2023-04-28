const main = document.querySelector("main");
const myLibrary = [];
const myLibraryCards = [];
const removeBookButtons = [];
const newBookForm = document.querySelector("#new-book-form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  const newBook = new Book(title.value, author.value, pages.value, read.value);

  myLibrary.push(newBook);
}

// Add Book keys to list
function appendBookDetails(newBookObject, bookList) {
  Object.keys(newBookObject).forEach((key) => {
    const bookDetail = document.createElement("li");

    if (key === "pages" && pages.value !== "") {
      bookDetail.textContent = `${newBookObject[key]} pages`;
    } else if (key === "read") {
      if (newBookObject[key] === true) {
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

// Create Book card
function createBookCard(newBookObject) {
  const newCard = document.createElement("div");
  newCard.className = "card";

  const bookDetailsList = document.createElement("ul");
  appendBookDetails(newBookObject, bookDetailsList);

  const removeBookButton = document.createElement("button");
  removeBookButton.type = "button";
  removeBookButton.className = "remove-book-button";

  myLibraryCards.push(newCard);
  removeBookButtons.push(removeBookButton);

  newCard.appendChild(removeBookButton);
  newCard.appendChild(bookDetailsList);
  main.appendChild(newCard);
  newCard.dataset.index = myLibrary.indexOf(newBookObject);
  newCard.tabIndex = 0;
  bookDetailsList.lastChild.tabIndex = 0;
}

//
newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary();
  createBookCard(myLibrary.at(-1));

  title.value = "";
  author.value = "";
  pages.value = "";
  read.value = "";
  read.checked = false;
});

// Delete Books
// This may lead to a lot of empty value in these arrays, is there a way to fix this?
main.addEventListener("click", (e) => {
  if (e.target.className === "remove-book-button") {
    delete myLibrary[e.target.parentElement.dataset.index];
    delete myLibraryCards[e.target.parentElement.dataset.index];
    e.target.parentElement.remove();
  }
});

// Switch read / not read
main.addEventListener("click", (e) => {
  if (e.target.lastChild && e.target.nodeName === "LI") {
    const bookIndex = e.target.parentElement.parentElement.dataset.index;
    if (myLibrary[bookIndex].read) {
      myLibrary[bookIndex].read = false;
      e.target.textContent = "Not read yet";
    } else {
      myLibrary[bookIndex].read = true;
      e.target.textContent = "Finished reading";
    }
  }
});

/**
 * TO BE DELETED - TESTING
 */
// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
// addBookToLibrary(theHobbit);

// const gideonTheNinth = new Book("Gideon the Ninth", "Tamsyn Muir", 492, true);
// addBookToLibrary(gideonTheNinth);

// const bookHasSpiders = new Book(
//   "This book is full of spiders: seriously, dude, don't touch it",
//   "David Wong",
//   450,
//   false
// );
// addBookToLibrary(bookHasSpiders);

// Object.keys(myLibrary).forEach((item) => {
//   createBookCard(myLibrary[item]);
// });
