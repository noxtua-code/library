const main = document.querySelector(".main");
const myLibrary = [];

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

    if (key === "pages") {
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
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);

createBookCard(theHobbit);
