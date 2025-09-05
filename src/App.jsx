import { useState } from 'react'

import React, { Component } from 'react'
import Navber from './component/Navber'
import News from './component/News'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navber/>
        <News/>
      </div>
    )
  }
}

