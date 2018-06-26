import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';
import './style.css';
import createChart from './createChart';

class GroupBarChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 20, right: 20, bottom: 30, left: 40,
    };
    this.width = 420 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }
  componentDidMount() {
    const { Transactions } = this.props;
    if (Transactions.length > 1) {
      createChart(this.height, this.width, this.margin, d3, Transactions, this.node);
    }
  }
  componentDidUpdate() {
    const { Transactions } = this.props;
    if (Transactions.length > 1) {
      createChart(this.height, this.width, this.margin, d3, Transactions, this.node);
    }
  }

  render() {
    const { showServiceTypeLoader, Transactions } = this.props;
    const renderComponent = showServiceTypeLoader ?
      (
        <div className="groupLoaderContainer">
          <BounceLoader
            color="#ffffff"
            loading
          />
        </div>
      )
      : <svg ref={node => { this.node = node; }} />;
    return (
      <div className="groupBarContainer">
        <h3 className="groupBarHeading">Transactions per Service Type and Channel Type</h3>
        {renderComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Transactions: state.revenues.Transactions,
  showServiceTypeLoader: state.revenues.showServiceTypeLoader,
});
GroupBarChart.defaultProps = {
  Transactions: [],
};
GroupBarChart.propTypes = {
  Transactions: PropTypes.array,
  showServiceTypeLoader: PropTypes.bool,
};
export default connect(mapStateToProps)(GroupBarChart);
