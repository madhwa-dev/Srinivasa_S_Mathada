const books = [
  "Bharatiya Samskritiyalli Govu - Srinivas S Mathad.pdf",
  "Sri Anubhashya Sarasangraha - Srinivasa S. Mathada.pdf",
  "Sri Veda Vyasa Stotra Manjari - Srinivasa S. Mathada.pdf",
];

const searchBox = document.getElementById("searchBox");
const bookList = document.getElementById("bookList");

function displayBooks(filter = "") {
  bookList.innerHTML = "";
  const lowerFilter = filter.toLowerCase();

  books
    .filter(name => name.toLowerCase().includes(lowerFilter))
    .forEach(book => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${book}<br/>
        <a href="books/${book}" target="_blank">📄 View</a>
        <a href="books/${book}" download>⬇️ Download</a>
      `;
      bookList.appendChild(li);
    });
}

searchBox.addEventListener("input", e => {
  displayBooks(e.target.value);
});

// Initial load
displayBooks();
