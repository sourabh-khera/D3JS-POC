import React, { Component } from 'react';
export default class DisplayRevenue extends Component {
  render(){
    return (
      <div style={{flex:1}}>
         <h4 style={{margin: '0 0 10px'}}>Gross Revenue</h4>
         <h1 style={{'font-size': '54px', margin: 0}}>79,880,341</h1>
      </div>
    )
  }
}
