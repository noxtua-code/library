const main = document.querySelector("main");
const myLibrary = [];
const newBookButton = document.querySelector(".new-book-button");
const newBookForm = document.querySelector("#new-book-form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "finished reading" : "not read yet"
  }`;
};

function addBookToLibrary(newBookObject) {
  myLibrary.push(newBookObject);
}

// Add Book keys to list
function appendBookDetails(newBookObject, bookList) {
  Object.keys(newBookObject).forEach((key) => {
    const bookDetail = document.createElement("li");

    if (key === "pages" && pages.value !== "") {
      bookDetail.textContent = `${newBookObject[key]} pages`;
    } else if (key === "read") {
      if (newBookObject[key] === "true") {
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

  newCard.appendChild(bookDetailsList);
  main.appendChild(newCard);
  newCard.dataset.index = myLibrary.indexOf(newBookObject);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary(theHobbit);

const gideonTheNinth = new Book("Gideon the Ninth", "Tamsyn Muir", 492, true);
addBookToLibrary(gideonTheNinth);

const bookHasSpiders = new Book(
  "This book is full of spiders: seriously, dude, don't touch it",
  "David Wong",
  450,
  false
);
addBookToLibrary(bookHasSpiders);

Object.keys(myLibrary).forEach((item) => {
  createBookCard(myLibrary[item]);
});

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newBook = new Book(title.value, author.value, pages.value, read.value);
  addBookToLibrary(newBook);
  createBookCard(myLibrary.at(-1));

  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
});
