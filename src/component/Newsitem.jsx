import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imgurl,newsurl}=this.props;
    return (
      <div>
        <div class="card" style={{width: "18rem"}}>
  <img src={imgurl} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title"> {title}</h5>
    <p class="card-text">{description}</p>
    <a href={newsurl} target='blank' class="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
