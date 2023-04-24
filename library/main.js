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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);

console.log(theHobbit.info());
console.log(Object.getPrototypeOf(theHobbit));
console.log(myLibrary);
