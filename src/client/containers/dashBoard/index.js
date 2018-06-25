import React, { Component } from 'react';
import Header from '../../components/dashboardHeader/header';
import SlideMenuBar from '../../components/slideMenuBar/slideMenuBar';
import DisplayRevenue from '../../components/displayRevenues/displayRevenue';
import './style.css';

export default class DashBoard extends Component {
  state = {};
  render() {
    return (
      <div className="dasboardContainer">
        <Header />
        <div id="outer-container" style={{ height: '100%', overflow: 'hidden' }}>
          <SlideMenuBar />
          <main id="page-wrap" className="page" >
            <div className="row">
              <DisplayRevenue containerBgColor={{ 'background-color': '#20a8d8' }} graphIcon="glyphicon-stats" />
              <DisplayRevenue containerBgColor={{ 'background-color': '#fdc10a' }} graphIcon="glyphicon-stats" />
              <DisplayRevenue containerBgColor={{ 'background-color': '#f86b6a' }} graphIcon="glyphicon-stats" />
              <DisplayRevenue containerBgColor={{ 'background-color': '#62c2de' }} graphIcon="glyphicon-transfer" />
            </div>
          </main>
        </div>
      </div>
    );
  }
}
