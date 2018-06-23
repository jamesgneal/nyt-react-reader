import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
	state = {
		articles: [],
		subject: "",
		startDate: "",
		endDate: "",
		savedArticles: []
	};

	componentDidMount() {
		this.loadSaved();
	}

	loadSaved = () => {
		API.getSaved().then(res => {
			this.setState({
				savedArticles: res.data
			});
			console.log(
				`\n****** This is the saved Article data from mongo ******\n\n${
					this.state.savedArticles
				}`
			);
		});
	};

	loadArticles = () => {
		API.getArticles()
			.then(res => {
				this.setState({
					articles: res.data
				});
			})
			.catch(err => console.log(err));
	};

	deleteArticle = id => {
		API.deleteArticle(id)
			.then(res => this.loadSaved())
			.catch(err => console.log(err));
	};

	saveArticle = articleData => {
		API.saveArticle(articleData)
			.then(res => this.loadSaved())
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
		API.getArticles({
			subject: this.state.subject,
			start: this.state.startDate,
			end: this.state.endDate
		})
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
					<Col size="md-12">
						<Jumbotron>
							<h1>New York Times Article Search</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.subject}
								onChange={this.handleInputChange}
								name="subject"
								placeholder="Article Subject"
							/>
							<Input
								value={this.state.startDate}
								onChange={this.handleInputChange}
								name="startDate"
								placeholder="Date range start - Format: YYYYMMDD"
							/>
							<Input
								value={this.state.endDate}
								onChange={this.handleInputChange}
								name="endDate"
								placeholder="Date range end - Format: YYYYMMDD"
							/>
							<FormBtn
								disabled={!this.state.subject}
								onClick={this.handleFormSubmit}
							>
								Search Article
							</FormBtn>
						</form>
					</Col>
				</Row>
				<Row>
					<Col size="lg-6">
						<div className="card">
							<div className="card-header">
								<h4>Search Results</h4>
							</div>
							<div className="card-body">
								{this.state.articles.length ? (
									<List>
										{this.state.articles.map(article => (
											<ListItem key={article._id}>
												<a href={article.web_url}>
													<strong>
														{article.headline.main} - {article.pub_date}
													</strong>
												</a>
												{/* {article.byline.original.length ? (
													<p>
														<em>{article.byline.original}</em>
													</p>
												) : (
													<p />
												)} */}
												<p>{article.snippet}</p>
												<SaveBtn
													onClick={() => {
														this.saveArticle({
															title: article.headline.main,
															snippet: article.snippet,
															date: article.pub_date,
															url: article.web_url
														});
														// console.log({
														// 	title: article.headline.main,
														// 	snippet: article.snippet,
														// 	date: article.pub_date
														// })
													}}
												/>
											</ListItem>
										))}
									</List>
								) : (
									<h5 className="text-center">No Results to Display</h5>
								)}
							</div>
						</div>
					</Col>
					{/* </Row>
                <Row> */}
					<Col size="lg-6">
						<div className="card">
							<div className="card-header">
								<h4>Saved Articles</h4>
							</div>
							<div className="card-body">
								{this.state.savedArticles.length ? (
									<List>
										{this.state.savedArticles.map(article => (
											<ListItem key={article._id}>
												<a href={article.url}>
													<strong>{article.title}</strong>
												</a>
												{/* {article.byline.original.length ? (
													<p>
														<em>{article.byline.original}</em>
													</p>
												) : (
													<p />
												)} */}
												<p>{article.snippet}</p>
												<DeleteBtn
													onClick={() => this.deleteArticle(article._id)}
												/>
											</ListItem>
										))}
									</List>
								) : (
									<h5 className="text-center">No Saved Articles</h5>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Articles;
