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
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

// Add form event listener
const form = document.querySelector("dialog form");
form.addEventListener("submit", displayNewBook);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks(books) {
  const grid = document.querySelector(".card_grid");
  const current_display = grid.childElementCount;
  books.slice(current_display).forEach((book, index) => {
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
    // Add event listeners
    remove.addEventListener("click", removeBook);
    read_status.addEventListener("click", toggleReadStatus)
    // Add content
    title.textContent = '"' + book.title + '"';
    author.textContent = book.author;
    pages.textContent = book.pages + " pages";
    read_status.textContent = book.read ? "Read" : "Not Read";
    remove.textContent = "Remove";
    card.append(title, author, pages, read_status, remove);
    card.dataset.index = index + current_display;
    // Add card to grid
    grid.append(card);
  });
}

function displayNewBook(e) {
  e.preventDefault();
  modal.close();
  const data = form.elements;
  addBookToLibrary(
    data["title"].value,
    data["author"].value,
    data["pages"].value,
    data["read"].checked
  );
  displayBooks(myLibrary);
  form.reset();
}

function removeBook(e) {
  const bookToRemove = e.target.parentNode;
  bookToRemove.remove();
  myLibrary.splice(bookToRemove.dataset.index, 1);
}

function toggleReadStatus(e) {
  const bookDOMNode = e.target.parentNode;
  console.log(bookDOMNode);
  const bookObject = myLibrary[bookDOMNode.dataset.index];
  const readStatusButton =
    bookDOMNode.querySelector(".unread") || bookDOMNode.querySelector(".read");
    readStatusButton.classList.toggle("read");
  readStatusButton.classList.toggle("unread");
  readStatusButton.textContent = readStatusButton.classList.contains("read")
    ? "Read"
    : "Not Read";
  bookObject.toggleRead();
}

displayBooks(myLibrary);
