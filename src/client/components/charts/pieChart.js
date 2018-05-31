import React, { Component } from 'react';
// import { csv } from 'd3-request'
import * as d3 from 'd3';
import revenueCsv from '../../csv/revenue.csv';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 20, bottom: 100, left: 40, right: 18,
    };
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
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
    .attr('transform', `translate(${this.margin.right} , ${this.margin.left})`);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius - 50);

  const pie = d3.pie()
    .sort(null)
    .value(d => (d.amount));

  const arcColor = d3.scaleOrdinal()
    .range(['purple', 'pink']);

  const pieTween = b => {
    b.innerRadius = 0;
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return t => (arc(i(t)));
  };

  d3.csv(revenueCsv, data => {
    data.forEach(d => {
      d.amount = +d.amount;
      d.revenueType = d.revenueType;
    });
    const g = svg.selectAll('.arc')
      .data(pie(data))
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
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(d => (d.data.revenueType))
      .attr('fill', 'white');
  });
};
render() {
  return <svg ref={node => { this.node = node; }} />;
}
}

export default PieChart;
