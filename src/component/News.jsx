import React, { Component } from "react";
import Newsitem from "./Newsitem";
import spinner from "./spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pagesize: 5,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  article = [];

  constructor() {
    super();
    this.state = {
      article: this.article,
      loading: false,
      page: 1,
      pageSize: 10,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category || prevProps.country !== this.props.country) {
      this.setState({ page: 1 }, this.fetchNews)
    }
  }

  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fbdfe5d5341e43228f5b6b68e4a9d895&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ article: parseData.articles });
  };

  handelpre = async () => {
    this.setState({ page: this.state.page - 1 }, this.fetchNews);
  };

  handelnext = async () => {
    this.setState({ page: this.state.page + 1 }, this.fetchNews);
  };
  render() {
    return (
      <div className="continer my-3">
        <h2>Monkey News- Top Headlines</h2>
        <div className="row">
          {this.state.article.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description ? element.description.slice(0, 85) : ""
                  }
                  imgurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handelpre}
          >
            &larr;Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handelnext}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;