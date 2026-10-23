
const books = [
    {
        id: 1,
        title: "Introduction to Java Programming",
        author: "Y. Daniel Liang",
        category: "Programming",
        status: "Available"
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        status: "Available"
    },
    {
        id: 3,
        title: "Learning Web Design",
        author: "Jennifer Niederst Robbins",
        category: "Programming",
        status: "Borrowed"
    },
    {
        id: 4,
        title: "Introduction to Education",
        author: "John Dewey",
        category: "Education",
        status: "Available"
    },
    {
        id: 5,
        title: "Noli Me Tangere",
        author: "Jose Rizal",
        category: "Literature",
        status: "Available"
    },
    {
        id: 6,
        title: "El Filibusterismo",
        author: "Jose Rizal",
        category: "Literature",
        status: "Borrowed"
    }
];

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const resultCount = document.getElementById("resultCount");
const totalBooks = document.getElementById("totalBooks");

if (totalBooks) {
    totalBooks.textContent = books.length;
}

function displayBooks() {
    if (!bookGrid) return;

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        const matchesStatus =
            selectedStatus === "All" ||
            book.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    resultCount.textContent =
        `Showing ${filteredBooks.length} of ${books.length} books`;

    if (filteredBooks.length === 0) {
        bookGrid.innerHTML =
            '<p class="empty-message">No books found. Try another search.</p>';
        return;
    }

    bookGrid.innerHTML = filteredBooks.map(book => `
        <article class="book-card">
            <div class="book-icon">📖</div>
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p class="category">Category: ${book.category}</p>
            <span class="status ${
                book.status === "Available" ? "available" : "borrowed"
            }">${book.status}</span>
            <button
                data-book-id="${book.id}"
                ${book.status === "Borrowed" ? "disabled" : ""}
            >
                ${book.status === "Available" ? "Borrow Book" : "Unavailable"}
            </button>
            ${book.status === "Borrowed"
                ? `<button data-return-id="${book.id}">Return Book (Demo)</button>`
                : ""}
        </article>
    `).join("");
}

if (bookGrid) {
    searchInput.addEventListener("input", displayBooks);
    categoryFilter.addEventListener("change", displayBooks);
    statusFilter.addEventListener("change", displayBooks);

    bookGrid.addEventListener("click", event => {
        const borrowId = event.target.dataset.bookId;
        const returnId = event.target.dataset.returnId;

        if (borrowId) {
            const book = books.find(item => item.id === Number(borrowId));

            if (book && book.status === "Available") {
                book.status = "Borrowed";
                displayBooks();
            }
        }

        if (returnId) {
            const book = books.find(item => item.id === Number(returnId));

            if (book) {
                book.status = "Available";
                displayBooks();
            }
        }
    });

    displayBooks();
}
