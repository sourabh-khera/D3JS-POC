import React, { Component } from 'react';
import Header from '../../components/dashboardHeader/header';
import SlideMenuBar from '../../components/slideMenuBar/slideMenuBar';

export default class DashBoard extends Component {
  render() {
    return (
      <div className="dasboardContainer">
        <Header />
        <div id="outer-container" style={{ height: '100%' }}>
          <SlideMenuBar />
          <div id="page-wrap" style={{ height: '100%', overflow: 'auto' }} />
        </div>
      </div>
    );
  }
}
