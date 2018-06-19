import axios from "axios";

const queryURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    apiKey = "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
    formQ = "&q=";

export default {

  // Gets all books
  getArticles: (searchTerm) => {
    return axios.get(queryURL+apiKey+formQ+searchTerm);
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
