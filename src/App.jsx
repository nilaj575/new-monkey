import React, { Component } from 'react'
import Navber from './component/Navber'
import News from './component/News'

export default class App extends Component {
  state = {
    category: 'science',
  }

  handleCategoryChange = (category) => {
    this.setState({ category })
  }

  render() {
    return (
      <div>
        <Navber category={this.state.category} onCategoryChange={this.handleCategoryChange} />
        <News country="us" category={this.state.category} />
      </div>
    )
  }
}

