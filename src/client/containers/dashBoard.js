import React, { Component } from 'react';
import DisplayRevenue from "../components/displayRevenue"
export default class DashBoard extends Component {
  render(){
    return (
      <div style={{display: flex}}>
        <DisplayRevenue />
      </div>

    )
  }
}
