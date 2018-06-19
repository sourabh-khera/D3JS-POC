import React, { Component } from 'react';
import './style.css';

export default class DashBoard extends Component {
  render () {
    return (
      <div className="dashBoardContainer">
        <div className="row dashBoardHeader">
          <div className="col-sm-4 leftHeader">
            <ul className="list-inline list-container">
              <li className="title">ATG / DMAP</li>
              <li className="commonLi"><span className="glyphicon glyphicon-menu-hamburger" /></li>
              <li className="commonLi">Settings</li>
              <li className="commonLi">Dashboard</li>
            </ul>
          </div>
          <div className="col-sm-4" />
          <div className="col-sm-4 rightHeader">
            <ul className="list-inline list-container">
              <li className="commonLi"><span className="glyphicon glyphicon-bell" /></li>
              <li><image src="../../assets/images/avatar.jpg" className="avatar" /></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
