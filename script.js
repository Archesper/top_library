let myLibrary = [];

// temporary to try out displayBooks()
myLibrary.push(new Book("The Book of Life", "Little Mix", 77, true));
myLibrary.push(new Book("The Book of Life", "Little Mix", 77, true));
myLibrary.push(new Book("The Book of Life", "Little Mix", 77, false));

// Add modal event listener
const add_book = document.getElementById("add_btn");
const modal = document.querySelector("dialog");
add_book.addEventListener("click", () => {
  modal.showModal();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks(books) {
  const grid = document.querySelector(".card_grid");
  books.forEach((book) => {
    // Create html elements
    const card = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h2");
    const pages = document.createElement("p");
    const read_status = document.createElement("button");
    const remove = document.createElement("button");
    // Add classes
    card.classList.add("card");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    read_status.classList.add(book.read ? "read" : "unread");
    // Add content
    title.textContent = '"' + book.title + '"';
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";
    read_status.textContent = book.read ? "Read" : "Not Read";
    remove.textContent = "Remove";
    card.append(title, author, pages, read_status, remove);
    // Add card to grid
    grid.append(card);
  });
}

displayBooks(myLibrary);
