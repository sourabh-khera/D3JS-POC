import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import './style.css';

class HorizontalBarChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 20, right: 20, bottom: 30, left: 50,
    };
    this.width = 400 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }
  createChart = () => {
    const { serviceTypeRevenues } = this.props;
    const xScale = d3.scaleLinear().rangeRound([0, this.width]);
    const yScale = d3.scaleBand().rangeRound([0, this.height]).padding(0.1);
    const color = d3.scaleOrdinal().range(['#4676ae', '#c86677']);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    const node = this.node;
    const svg = d3.select(node)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left} , ${this.margin.top})`);

    const stack = d3.stack()
      .keys(['GrossRevenue', 'NetRevenue'])
      .offset(d3.stackOffsetNone);

    const layers = stack(serviceTypeRevenues);
    yScale.domain(serviceTypeRevenues.map(d => (d.ServiceType)));
    xScale.domain([0, d3.max(serviceTypeRevenues, d => (d.GrossRevenue))]).nice();

    const layer = svg.selectAll('.layer')
      .data(layers)
      .enter().append('g')
      .attr('class', 'layer')
      .style('fill', (d, i) => (color(i)));

    layer.selectAll('rect')
      .data(d => (d))
      .enter().append('rect')
      .attr('y', d => (yScale(d.data.ServiceType)))
      .attr('x', d => (xScale(d[0])))
      .attr('height', yScale.bandwidth())
      .attr('width', d => (xScale(d[1]) - xScale(d[0])));

    svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${this.height + 5})`)
      .call(xAxis.ticks(null, 's'));

    svg.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', 'translate(0,0)')
      .call(yAxis);
  }
  render() {
    const { showServiceTypeLoader } = this.props;
    const renderComponent = showServiceTypeLoader ?
      (
        <div className="horizontalLoaderContainer">
          <BounceLoader
            color="#123abc"
            loading
          />
        </div>
      )
      : <svg ref={node => { this.node = node; }} />;
    return (
      <div className="horizontalBarContainer">
        <h3 className="horizontalBarHeading">Gross Revenue & Net Revenue per Service Type</h3>
        {renderComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  serviceTypeRevenues: state.revenues.serviceTypeRevenues,
  showServiceTypeLoader: state.revenues.showServiceTypeLoader,
});
HorizontalBarChart.defaultProps = {
  serviceTypeRevenues: [],
};
HorizontalBarChart.propTypes = {
  serviceTypeRevenues: PropTypes.array,
  showServiceTypeLoader: PropTypes.bool,
};
export default connect(mapStateToProps)(HorizontalBarChart);
