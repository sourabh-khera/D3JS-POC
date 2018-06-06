import React, { Component } from 'react';
import * as d3 from 'd3';
import revenueCsv from '../../../csv/revenue.csv';
import './style.css';
import createChart from './createChart';

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 20, bottom: 60, left: 40, right: 18,
    };
    this.width = 320 - this.margin.left - this.margin.right;
    this.height = 320 - this.margin.top - this.margin.bottom;
    this.radius = this.width / 2;
  }
  componentDidMount() {
    createChart(this.height, this.width, this.margin, d3, revenueCsv, this.node, this.radius);
  }
  componentDidUpdate() {
    createChart(this.height, this.width, this.margin, d3, revenueCsv, this.node, this.radius);
  }


  render() {
    return (
      <div className="donutContainer">
        <h3 className="donutHeading">Online/ Offline Gross Revenue</h3>
        <svg ref={node => { this.node = node; }} />
      </div>
    );
  }
}

export default DonutChart;
