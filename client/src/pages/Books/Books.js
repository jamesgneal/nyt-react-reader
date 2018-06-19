import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
	state = {
		articles: [],
		title: "",
		author: "",
		synopsis: ""
	};

	componentDidMount() {
		// this.loadBooks();
	}

	loadBooks = () => {
		API.getBooks()
			.then(res =>
				this.setState({ books: res.data, title: "", author: "", synopsis: "" })
			)
			.catch(err => console.log(err));
	};

	deleteBook = id => {
		API.deleteBook(id)
			.then(res => this.loadBooks())
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		API.getArticles(this.state.title)
			.then(res => {
				console.log(res.data.response.docs);
				this.setState({ articles: res.data.response.docs });
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>New York Times Article Search</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.title}
								onChange={this.handleInputChange}
								name="title"
								placeholder="Article Subject"
							/>
							{/* <Input
								value={this.state.author}
								onChange={this.handleInputChange}
								name="author"
								placeholder="Author (required)"
							/> */}
							<FormBtn
								disabled={!(this.state.title)}
								onClick={this.handleFormSubmit}
							>
								Submit Book
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Books On My List</h1>
						</Jumbotron>
						{this.state.articles.length ? (
							<List>
								{this.state.articles.map(article => (
									<ListItem key={article.headline.main}>
										<Link to={"/books/" + article._id}>
											<strong>
												{article.headline.main}
											</strong>
										</Link>
										{/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Books;
