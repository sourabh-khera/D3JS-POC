import React, { Component } from 'react';
import * as d3 from 'd3';
import revenueCsv from '../../../csv/revenue.csv';
import './style.css';

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
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }

createChart = () => {
  const node = this.node;
  const svg = d3.select(node)
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', `translate(${this.width / 2},${150})`);

  const arc = d3.arc()
    .innerRadius(this.radius - 40)
    .outerRadius(this.radius - 10);

  const pie = d3.pie()
    .sort(null)
    .value(d => (d.amount));

  const arcColor = d3.scaleOrdinal()
    .range(['#4676ae', '#c86677']);

  const pieTween = b => {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return t => (arc(i(t)));
  };
  const leftArc = d3.arc()
    .innerRadius(this.radius - -10)
    .outerRadius(this.radius - -10);

  revenueCsv.forEach(row => {
    row.amount = +row.amount;
    row.revenueType = row.revenueType;
  });
  const scale = () => {
    d3.select(this)
      .transition()
      .attr('transform', 'scaleX(1.1)')
      .attr('transform', 'scaleY(1.1)')
      .duration(200);
  };
  const g = svg.selectAll('.arc')
    .data(pie(revenueCsv))
    .enter()
    .append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .attr('fill', d => (arcColor(d.data.revenueType)))
    .transition()
    .ease(d3.easeLinear)
    .duration(3000)
    .attrTween('d', pieTween);

  g.append('text')
    .attr('transform', d => (`translate(${leftArc.centroid(d)})`))
    .attr('dy', '.35em')
    .style('text-anchor', 'middle')
    .text(d => (d.data.revenueType))
    .attr('fill', 'black');
};
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
