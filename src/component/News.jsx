import React, { Component } from "react";
import Newsitem from "./Newsitem";
// import spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pagesize: 5,
    category: 'general',
  };

  cache = new Map();
  requestInFlight = false;

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

  getApiCategory = () => {
    const category = this.props.category?.toLowerCase();
    if (!category || category === "general") {
      return "top";
    }
    return category;
  };

  isValidImageUrl = (value) => {
    return typeof value === "string" && /^https?:\/\//i.test(value.trim()) && /\.(jpg|jpeg|png|webp|gif|bmp|svg)(\?.*)?$/i.test(value.trim());
  };

  fetchNews = async () => {
    const category = this.getApiCategory();
    const cacheKey = `${category}-${this.props.country || "us"}-${this.state.page}`;

    if (this.cache.has(cacheKey)) {
      this.setState({ article: this.cache.get(cacheKey), loading: false });
      return;
    }

    if (this.requestInFlight) {
      return;
    }

    try {
      this.requestInFlight = true;
      this.setState({ loading: true });

      const safeCategory = category === "top" ? "" : category;
      const baseUrl = `https://newsdata.io/api/1/latest?apikey=pub_d67e0a8d8c054ec0a53baf34f0f7e36a&language=en`;
      const requestUrl = safeCategory
        ? `${baseUrl}&category=${safeCategory}`
        : baseUrl;

      let response = await fetch(requestUrl);

      if (!response.ok) {
        if (response.status === 429) {
          const fallbackArticles = [];
          this.cache.set(cacheKey, fallbackArticles);
          this.setState({ article: fallbackArticles, loading: false });
          return;
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      const parseData = await response.json();
      const articles = Array.isArray(parseData.results)
        ? parseData.results.filter((item) =>
            this.isValidImageUrl(item.image_url || item.urlToImage || item.image)
          )
        : [];

      this.cache.set(cacheKey, articles);
      this.setState({ article: articles, loading: false });
    } catch (error) {
      console.error("News fetch failed:", error);
      this.setState({ article: [], loading: false });
    } finally {
      this.requestInFlight = false;
    }
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
        {this.state.article.length === 0 ? (
          <p className="text-muted">No news items with accessible images are available right now.</p>
        ) : (
          <div className="row">
            {this.state.article.map((element, index) => {
              return (
                <div className="col-md-3" key={element.url || `${element.title}-${index}`}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description ? element.description.slice(0, 85) : ""
                    }
                    imgurl={element.image_url || element.urlToImage || element.image || ""}
                    newsurl={element.link || element.url}
                  />
                </div>
              );
            })}
          </div>
        )}
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