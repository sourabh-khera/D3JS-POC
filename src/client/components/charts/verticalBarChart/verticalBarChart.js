import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import './style.css';
import createChart from './createChart';

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
