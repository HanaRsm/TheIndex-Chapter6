import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    this.books = [];
    this.loading = true;
    // this.books.color = [];
    this.query = "";
  }

  fetchBooks() {
    return instance
      .get("/api/books/")
      .then(res => res.data)
      .then(books => {
        console.log(books);
        this.books = books;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get filteredBooks() {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  filterBooksByColor(bookColor) {
    return this.filteredBooks.filter(book => book.color === bookColor);
  }
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
