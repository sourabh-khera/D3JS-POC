import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import './style.css';
import createChart from './createChart';

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
    const { channelTypeRevenues } = this.props;
    createChart(this.height, this.width, this.margin, d3, channelTypeRevenues, this.node, this.radius);
  }
  componentDidUpdate() {
    const { channelTypeRevenues } = this.props;
    createChart(this.height, this.width, this.margin, d3, channelTypeRevenues, this.node, this.radius);
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
