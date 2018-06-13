import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import './style.css';
import createChart from './createChart';

class TreeMap extends Component {
  constructor() {
    super();
    this.margin = {
      top: 20, right: 18, bottom: 100, left: 40,
    };
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  componentDidMount() {
    const { cityRevenues } = this.props;
    if (isEmpty(cityRevenues)) {
      return;
    }
    createChart(this.height, this.width, this.margin, d3, cityRevenues, this.node);
  }
  componentDidUpdate() {
    const { cityRevenues } = this.props;
    if (isEmpty(cityRevenues)) {
      return;
    }
    createChart(this.height, this.width, this.margin, d3, cityRevenues, this.node);
  }
  render() {
    const { showCityLoader } = this.props;
    const renderComponent = showCityLoader ?
      (
        <div className="treeMapLoaderContainer">
          <BounceLoader
            color="#ffffff"
            loading
          />
        </div>
      )
      : <svg ref={node => { this.node = node; }} />;
    return (
      <div className="treeMapContainer">
        <h3 className="treeMapHeading">Fortress City Gross Revenue</h3>
        {renderComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cityRevenues: state.revenues.cityRevenues,
  showCityLoader: state.revenues.showCityLoader,
});
TreeMap.defaultProps = {
  cityRevenues: {},
};
TreeMap.propTypes = {
  cityRevenues: PropTypes.object,
  showCityLoader: PropTypes.bool,
};
export default connect(mapStateToProps)(TreeMap);
