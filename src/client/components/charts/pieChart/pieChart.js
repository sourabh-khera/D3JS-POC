import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import './style.css';

class PieChart extends Component {
  constructor() {
    super();
    this.margin = {
      top: 30, bottom: 60, left: 40, right: 60,
    };
    this.width = 380 - this.margin.left - this.margin.right;
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
    const { channelTypeRevenues } = this.props;
    const node = this.node;
    const svg = d3.select(node)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${150})`);
    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#ff8c00', '#6b486b', '#d0743c']);

    const pie = d3.pie()
      .sort(null)
      .value(d => (d.GrossRevenue));

    const path = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    const pieTween = b => {
      b.innerRadius = 0;
      const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return t => (path(i(t)));
    };

    const g = svg.selectAll('.arc')
      .data(pie(channelTypeRevenues))
      .enter()
      .append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', path)
      .attr('fill', d => (color(d.data.ChannelType)))
      .transition()
      .ease(d3.easeLinear)
      .duration(3000)
      .attrTween('d', pieTween);

    const legend = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .attr('transform', `translate(${-60},${-70})`)
      .selectAll('g')
      .data(channelTypeRevenues)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend.append('rect')
      .attr('x', this.width)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', d => color(d.ChannelType));

    legend.append('text')
      .attr('x', this.width - 4)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d.ChannelType);
  }

  render() {
    const { showChannelTypeLoader } = this.props;
    const renderComponent = showChannelTypeLoader ?
      (
        <div className="pieLoaderContainer">
          <BounceLoader
            color="#123abc"
            loading
          />
        </div>
      )
      : <svg ref={node => { this.node = node; }} />;
    return (
      <div className="pieContainer">
        <h3 className="pieHeading">Net Revenue per Channel Type</h3>
        {renderComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channelTypeRevenues: state.revenues.channelTypeRevenues,
  showChannelTypeLoader: state.revenues.showChannelTypeLoader,
});
PieChart.defaultProps = {
  channelTypeRevenues: [],
};
PieChart.propTypes = {
  channelTypeRevenues: PropTypes.array,
  showChannelTypeLoader: PropTypes.bool,
};
export default connect(mapStateToProps)(PieChart);
