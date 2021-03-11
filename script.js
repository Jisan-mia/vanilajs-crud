//find elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const publishedYear = document.getElementById("publishedYear");

const msgArea = document.getElementById("msgArea");
const tBody = document.getElementById("tBody");

const form = document.getElementById("book-form");

let selectedRow = null;

//get information from the form
function getBookInformation() {
	const bookInformation = {};
	bookInformation["title"] = title.value;
	bookInformation["author"] = author.value;
	bookInformation["isbn"] = isbn.value;
	bookInformation["publishedYear"] = publishedYear.value;
	return bookInformation;
}

// validateForm
function validateForm() {
	if (
		title.value !== "" &&
		author.value !== "" &&
		isbn.value !== "" &&
		publishedYear.value !== ""
	) {
		alertMsg("Book Added Successfully", "success");

		return true;
	} else {
		alertMsg("Fill up all the field please!", "danger");

		return false;
	}
}

//insert book information into table
let id = 1;
function insertNewBook(book) {
	console.log(book);

	const bookInfo = `
	<tr>
	    <th>${id}</th>
	    <td>${book.title}</td>
	    <td> ${book.author} </td>
	    <td> ${book.isbn} </td>
	    <td>${book.publishedYear} </td>
        <td> <i onclick=(editBook(this)) class="fas fa-edit" title="edit"></i> <i onclick=(deleteBook(this)) class="fas fa-times" title="Delete"></i> </td>
	</tr>
	`;
	id++;
	tBody.insertAdjacentHTML("beforeend", bookInfo);
}

//delete book
function deleteBook(row) {
	const parent = row.parentNode.parentNode;
	parent.innerHTML = "";
	alertMsg("Deleted Successfully", "warning");
}

//edit book
function editBook(row) {
	console.log("row edit", row.parentNode.parentNode);
	selectedRow = row.parentNode.parentNode;
	title.value = selectedRow.cells[1].innerText;
	author.value = selectedRow.cells[2].innerHTML;
	isbn.value = selectedRow.cells[3].innerHTML;
	publishedYear.value = selectedRow.cells[4].innerHTML;

	document.querySelector(".submit-btn").value = "Update";
}

//update book
function updateBook(book) {
	selectedRow.cells[1].innerHTML = book.title;
	selectedRow.cells[2].innerHTML = book.author;
	selectedRow.cells[3].innerHTML = book.isbn;
	selectedRow.cells[4].innerHTML = book.publishedYear;
}

// alert message
function alertMsg(msg, bgColor) {
	let message = `<div class="alert alert-${bgColor}" role="alert">
        ${msg}
    </div>`;
	msgArea.innerHTML = message;
	setTimeout(() => {
		msgArea.innerHTML = "";
	}, 2000);
}

//reset form
function resetForm() {
	form.reset();
	selectedRow = null;
}

//form onsubmit
form.addEventListener("submit", function (e) {
	e.preventDefault();

	if (validateForm()) {
		const bookInfo = getBookInformation();
		if (selectedRow == null) {
			insertNewBook(bookInfo);
		} else {
			document.querySelector(".submit-btn").value = "Submit";

			alertMsg("Book Updated Successfully", "primary");

			updateBook(bookInfo);
		}
	}
	resetForm();
});
