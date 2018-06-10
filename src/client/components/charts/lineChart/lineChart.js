import React, { Component } from 'react';
import * as d3 from 'd3';
import { BounceLoader } from 'react-spinners';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import createChart from './createChart';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 20, right: 18, bottom: 30, left: 40,
    };
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 450 - this.margin.top - this.margin.bottom;
  }
  componentDidMount() {
    const { channelTypeRevenues } = this.props;
    createChart(this.height, this.width, this.margin, d3, channelTypeRevenues, this.node);
  }
  componentDidUpdate() {
    const { channelTypeRevenues } = this.props;
    createChart(this.height, this.width, this.margin, d3, channelTypeRevenues, this.node);
  }


  render() {
    const { showChannelTypeLoader } = this.props;
    const renderComponent = showChannelTypeLoader ?
      (
        <div className="lineLoaderContainer">
          <BounceLoader
            color="#123abc"
            loading
          />
        </div>
      )
      : <svg ref={node => { this.node = node; }} />;
    return (
      <div className="lineContainer" id="div1">
        <h3 className="lineHeading">Net Revenue per Channel Type</h3>
        {renderComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channelTypeRevenues: state.revenues.channelTypeRevenues,
  showChannelTypeLoader: state.revenues.showChannelTypeLoader,
});
LineChart.defaultProps = {
  channelTypeRevenues: [],
};
LineChart.propTypes = {
  channelTypeRevenues: PropTypes.array,
  showChannelTypeLoader: PropTypes.bool,

};
export default connect(mapStateToProps)(LineChart);
