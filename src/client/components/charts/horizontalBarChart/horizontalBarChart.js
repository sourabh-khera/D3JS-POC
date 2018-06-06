import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import './style.css';
import createChart from './createChart';

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
    const { serviceTypeRevenues } = this.props;
    createChart(this.height, this.width, this.margin, d3, serviceTypeRevenues, this.node);
  }
  componentDidUpdate() {
    const { serviceTypeRevenues } = this.props;
    createChart(this.height, this.width, this.margin, d3, serviceTypeRevenues, this.node);
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
