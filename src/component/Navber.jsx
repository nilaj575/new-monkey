import React, { Component } from 'react'

export class Navber extends Component {
  handleCategoryClick = (event, category) => {
    event.preventDefault()
    if (this.props.onCategoryChange) {
      this.props.onCategoryChange(category)
    }
    window.location.hash = category
  }

  getLinkClass = (category) => {
    const activeCategory = this.props.category || 'general'
    return `nav-link${activeCategory === category ? ' active fw-bold text-primary text-decoration-underline' : ''}`
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">News Repoart</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className={this.getLinkClass('general')} aria-current={this.props.category === 'general' ? 'page' : undefined} href="#general" onClick={(e) => this.handleCategoryClick(e, 'general')}>Home</a>
                </li>
                <li className="nav-item"><a className={this.getLinkClass('business')} aria-current={this.props.category === 'business' ? 'page' : undefined} href="#business" onClick={(e) => this.handleCategoryClick(e, 'business')}>business</a></li>
                <li className="nav-item"><a className={this.getLinkClass('entertainment')} aria-current={this.props.category === 'entertainment' ? 'page' : undefined} href="#entertainment" onClick={(e) => this.handleCategoryClick(e, 'entertainment')}>entertainment</a></li>
                <li className="nav-item"><a className={this.getLinkClass('health')} aria-current={this.props.category === 'health' ? 'page' : undefined} href="#health" onClick={(e) => this.handleCategoryClick(e, 'health')}>health</a></li>
                <li className="nav-item"><a className={this.getLinkClass('science')} aria-current={this.props.category === 'science' ? 'page' : undefined} href="#science" onClick={(e) => this.handleCategoryClick(e, 'science')}>science</a></li>
                <li className="nav-item"><a className={this.getLinkClass('sports')} aria-current={this.props.category === 'sports' ? 'page' : undefined} href="#sports" onClick={(e) => this.handleCategoryClick(e, 'sports')}>sports</a></li>
                <li className="nav-item"><a className={this.getLinkClass('technology')} aria-current={this.props.category === 'technology' ? 'page' : undefined} href="#technology" onClick={(e) => this.handleCategoryClick(e, 'technology')}>technology</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navber
