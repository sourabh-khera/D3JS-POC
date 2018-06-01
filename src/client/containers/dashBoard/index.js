import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';
import DisplayRevenue from '../../components/displayRevenues/displayRevenue';
import {
  getTotalRevenues,
  getCityBasedRevenues,
  getChannelBasedRevenues,
  getServiceBasedRevenues,
} from '../../actions/asyncAction/revenues';
import './style.css';
import PieChart from '../../components/charts/pieChart/pieChart';
import HorizontalBarChart from '../../components/charts/horizontalBarChart/horizontalBarChart'

class DashBoard extends Component {
  componentDidMount() {
    const {
      fetchTotalRevenues,
      fetchCityBasedRevenues,
      fetchChannelBasedRevenues,
      fetchServiceBasedRevenues,
    } = this.props;

    fetchTotalRevenues();
    fetchServiceBasedRevenues();
  }
  render() {
    const { totalRevenues, showLoader } = this.props;
    const keys = Object.keys(totalRevenues);
    const renderDisplayRevenues = keys.map((item, id) => (
      <DisplayRevenue
        key={id}
        title={item}
        amount={<CountUp
          start={0}
          end={totalRevenues[item]}
          duration={2}
          useEasing
          decimals={item === 'Total Transactions' ? 0 : 2}
          decimal={item === 'Total Transactions' ? '' : '.'}
          separator=","
          prefix={item === 'Total Transactions' ? '' : '$'}
        />}
      />
    ));
    const renderComponent = showLoader ?
      (
        <div className="loaderContainer">
          <RingLoader
            color="#123abc"
            loading
          />
        </div>
      )
      : <PieChart />;
    return (
      <div className="dashBoardContainer">
        <div className="displayRevenueContainer">
          { renderDisplayRevenues }
        </div>
        {!showLoader ? <HorizontalBarChart /> : null}
        { renderComponent }
      </div>
    );
  }
}

DashBoard.defaultProps = {
  totalRevenues: {},
};

const mapStateToProps = state => ({
  totalRevenues: state.revenues.totalRevenues,
  showLoader: state.revenues.showLoader,
});
const mapDispatchToProps = dispatch => ({
  fetchTotalRevenues: () => dispatch(getTotalRevenues()),
  fetchServiceBasedRevenues: () => dispatch(getServiceBasedRevenues()),
  fetchChannelBasedRevenues: () => dispatch(getChannelBasedRevenues()),
  fetchCityBasedRevenues: () => dispatch(getCityBasedRevenues()),
});

DashBoard.propTypes = {
  totalRevenues: PropTypes.object,
  fetchTotalRevenues: PropTypes.func.isRequired,
  fetchServiceBasedRevenues: PropTypes.func.isRequired,
  fetchChannelBasedRevenues: PropTypes.func.isRequired,
  fetchCityBasedRevenues: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
