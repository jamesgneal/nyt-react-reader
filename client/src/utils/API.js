import axios from "axios";

const queryURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    apiKey = "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
    formQ = "&q=",
    startSyntax= "&begin_date=",
    endSyntax="&end_date=";

export default {

  // Gets all articles
  getArticles: (searchTerm) => {
      console.log(`\n====== SEARCH TERMS ======\n\n${searchTerm.subject}\n${searchTerm.start}\n${searchTerm.end}`)
    return axios.get(queryURL+apiKey+formQ+searchTerm.subject+startSyntax+searchTerm.start+endSyntax+searchTerm.end);
  },
  // Gets the article with the given id
  getSaved: function() {
    return axios.get("/api/articles/");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
