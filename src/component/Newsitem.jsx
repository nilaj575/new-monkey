import React, { Component } from 'react'

const fallbackImage = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%236c757d'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export class Newsitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: props.imgurl || fallbackImage,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imgurl !== this.props.imgurl) {
      this.setState({ imageSrc: this.props.imgurl || fallbackImage });
    }
  }

  handleImageError = () => {
    if (this.state.imageSrc !== fallbackImage) {
      this.setState({ imageSrc: fallbackImage });
    }
  };

  render() {
    let {title,description,imgurl,newsurl}=this.props;
    const imageSrc = this.state.imageSrc;

    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={imageSrc} onError={this.handleImageError} className="card-img-top" alt={title || "News image"} style={{height: "180px", objectFit: "cover"}}/>
  <div className="card-body">
    <h5 className="card-title"> {title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsurl} target='blank' className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
