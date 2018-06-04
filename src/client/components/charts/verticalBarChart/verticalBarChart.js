import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import './style.css';

class VerticalBarChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 20, right: 18, bottom: 100, left: 40,
    };
    this.width = 400 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }
createChart = () => {
  const { channelTypeRevenues } = this.props;
  const node = this.node;
  const svg = d3.select(node)
    .attr('width', this.width + this.margin.right + this.margin.left)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', `translate(${this.margin.left} , ${this.margin.right})`);

  const xScale = d3.scaleBand()
    .rangeRound([0, this.width]);

  const yScale = d3.scaleLinear()
    .range([this.height, 0]);

  const color = d3.scaleOrdinal(['#6b486b', '#8a89a6', '#ff8c00', '#98abc5', '#d0743c']);

  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale);

  channelTypeRevenues.sort((a, b) => b.GrossRevenue - a.GrossRevenue);

  xScale.domain(channelTypeRevenues.map(d => d.ChannelType));
  yScale.domain([0, d3.max(channelTypeRevenues, d => d.GrossRevenue)]);
  const tooltip = d3.select('#div1').append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('display', 'inline-block')
    .style('padding', '5px')
    .style('background-color', 'rgba(0,0,0,0.5)')
    .style('color', 'white');

  svg.selectAll('rect')
    .data(channelTypeRevenues)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.ChannelType))
    .attr('y', d => yScale(d.GrossRevenue))
    .attr('height', d => this.height - yScale(d.GrossRevenue))
    .attr('width', 25)
    .attr('fill', d => color(d.ChannelType))
    .attr('transform', `translate(${22},${0})`)
    .on('mouseover', d => {
      tooltip
        .style('opacity', 1)
        .text(d.ChannelType);
    })
    .on('mousemove', () => {
      tooltip
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY - 550}px`);
    })
    .on('mouseout', () => {
      tooltip
        .style('opacity', 0);
    });

  svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0, ${this.height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('transform', 'rotate(-60)')
    .attr('dx', '-.8em')
    .attr('dy', '.25em')
    .attr('text-anchor', 'end');
  svg.append('g')
    .attr('class', 'yAxis')
    .call(yAxis.ticks(null, 's'));
};
render() {
  const { showChannelTypeLoader } = this.props;
  const renderComponent = showChannelTypeLoader ?
    (
      <div className="verticalLoaderContainer">
        <BounceLoader
          color="#123abc"
          loading
        />
      </div>
    )
    : <svg ref={node => { this.node = node; }} />;
  return (
    <div className="verticalBarContainer" id="div1">
      <h3 className="verticalBarHeading">Gross Revenue per Channel Type</h3>
      {renderComponent}
    </div>
  );
}
}

const mapStateToProps = state => ({
  channelTypeRevenues: state.revenues.channelTypeRevenues,
  showChannelTypeLoader: state.revenues.showChannelTypeLoader,
});
VerticalBarChart.defaultProps = {
  channelTypeRevenues: [],
};
VerticalBarChart.propTypes = {
  channelTypeRevenues: PropTypes.array,
  showChannelTypeLoader: PropTypes.bool,

};
export default connect(mapStateToProps)(VerticalBarChart);
