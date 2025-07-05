let books = [];
const booksPerPage = 10; // 2 rows × 5 columns
let currentPage = 1;

const searchBox = document.getElementById("searchBox");
const bookList = document.getElementById("bookList");

// Fetch books.json and initialize
async function loadBooks() {
  try {
    const res = await fetch("books.json");
    books = await res.json();
    displayBooks();
  } catch (err) {
    bookList.innerHTML = "<p style='color:red;'>Error loading books.json</p>";
  }
}

// Render books for current page and filter
function displayBooks(filter = "") {
  const lowerFilter = filter.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(lowerFilter)
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const start = (currentPage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(start, start + booksPerPage);

  bookList.innerHTML = "";

  paginatedBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <a href="books/${book.file}" target="_blank">📄 View</a> |
      <a href="books/${book.file}" download>⬇️ Download</a>
    `;
    bookList.appendChild(card);
  });

  renderPagination(totalPages, filter);
}

// Pagination buttons
function renderPagination(totalPages, filter) {
  const pagination = document.createElement("div");
  pagination.className = "pagination";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) button.classList.add("active");

    button.addEventListener("click", () => {
      currentPage = i;
      displayBooks(filter);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    pagination.appendChild(button);
  }

  bookList.appendChild(pagination);
}

// Search box input handler
searchBox.addEventListener("input", e => {
  currentPage = 1;
  displayBooks(e.target.value);
});

// Initial load
loadBooks();
