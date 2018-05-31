import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import DisplayRevenue from '../../components/displayRevenues/displayRevenue';
import {
  getTotalRevenues,
  getCityBasedRevenues,
  getChannelBasedRevenues,
  getServiceBasedRevenues,
} from '../../actions/asyncAction/revenues';
import './style.css';
import PieChart from '../../components/charts/pieChart';

class DashBoard extends Component {
  componentDidMount() {
    const {
      fetchTotalRevenues,
      fetchCityBasedRevenues,
      fetchChannelBasedRevenues,
      fetchServiceBasedRevenues,
    } = this.props;

    fetchTotalRevenues();
  }
  render() {
    const { totalRevenues } = this.props;
    if (isEmpty(totalRevenues)) {
      return null;
    }
    const keys = Object.keys(totalRevenues);
    const renderDisplayRevenues = keys.map((item, id) => (
      <DisplayRevenue
        key={id}
        title={item}
        amount={<CountUp
          start={0}
          end={totalRevenues[item]}
          duration={4}
          useEasing
          decimals={item === 'Total Transactions' ? 0 : 2}
          decimal={item === 'Total Transactions' ? '' : '.'}
          separator=","
          prefix={item === 'Total Transactions' ? '' : '$'}
        />}
      />
    ));
    return (
      <div>
        <div className="displayRevenueContainer">
          { renderDisplayRevenues }
        </div>
        <PieChart />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  totalRevenues: state.revenues.totalRevenues,
});
const mapDispatchToProps = dispatch => ({
  fetchTotalRevenues: () => dispatch(getTotalRevenues()),
  fetchServiceBasedRevenues: () => dispatch(getServiceBasedRevenues()),
  fetchChannelBasedRevenues: () => dispatch(getChannelBasedRevenues()),
  fetchCityBasedRevenues: () => dispatch(getCityBasedRevenues()),
});

DashBoard.propTypes = {
  totalRevenues: PropTypes.object.isRequired,
  fetchTotalRevenues: PropTypes.func.isRequired,
  fetchServiceBasedRevenues: PropTypes.func.isRequired,
  fetchChannelBasedRevenues: PropTypes.func.isRequired,
  fetchCityBasedRevenues: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
