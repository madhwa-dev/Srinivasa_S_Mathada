const books = [
  {
    title: "Bharatiya Samskritiyalli Govu",
    file: "Bharatiya Samskritiyalli Govu - Srinivas S Mathad.pdf",
    thumbnail: "books/thumbs/govu.jpg"
  },
  {
    title: "Sri Anubhashya Sarasangraha",
    file: "Sri Anubhashya Sarasangraha - Srinivasa S. Mathada.pdf",
    thumbnail: "books/thumbs/anubhashya.jpg"
  },
  {
    title: "Sri Veda Vyasa Stotra Manjari",
    file: "Sri Veda Vyasa Stotra Manjari - Srinivasa S. Mathada.pdf",
    thumbnail: "books/thumbs/vedavyasa.jpg"
  }
];

const searchBox = document.getElementById("searchBox");
const bookList = document.getElementById("bookList");

function displayBooks(filter = "") {
  bookList.innerHTML = "";
  const lowerFilter = filter.toLowerCase();

  books
    .filter(book => book.title.toLowerCase().includes(lowerFilter))
    .forEach(book => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <img src="${book.thumbnail}" alt="${book.title} thumbnail" />
        <h3>${book.title}</h3>
        <a href="books/${book.file}" target="_blank">📄 View</a> |
        <a href="books/${book.file}" download>⬇️ Download</a>
      `;
      bookList.appendChild(card);
    });
}

searchBox.addEventListener("input", e => {
  displayBooks(e.target.value);
});

window.onload = () => {
  displayBooks();
};
