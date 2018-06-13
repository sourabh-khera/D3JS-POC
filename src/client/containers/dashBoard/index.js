import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { clearTransactions } from '../../actions/revenues';
import './style.css';
import isEqual from 'lodash/isEqual';
import DonutChart from '../../components/charts/donutChart/donutChart';
import HorizontalBarChart from '../../components/charts/horizontalBarChart/horizontalBarChart';
import PieChart from '../../components/charts/pieChart/pieChart';
import VerticalBarChart from '../../components/charts/verticalBarChart/verticalBarChart';
import TreeMap from '../../components/charts/treemap/treemap';
import GroupBarChart from '../../components/charts/groupBarChart/groupBarChart';
import Date from '../../components/selectdate/selectDate';
import LineChart from '../../components/charts/lineChart/lineChart';

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      dateObject: {},
    };
  }
  componentDidMount() {
    const {
      fetchTotalRevenues,
      fetchCityBasedRevenues,
      fetchChannelBasedRevenues,
      fetchServiceBasedRevenues,
      dateObj,
    } = this.props;
    fetchTotalRevenues(dateObj);
    fetchServiceBasedRevenues(dateObj);
    fetchChannelBasedRevenues(dateObj);
    fetchCityBasedRevenues(dateObj);
  }
  componentWillReceiveProps(nextProps) {
    const {
      fetchTotalRevenues,
      fetchCityBasedRevenues,
      fetchChannelBasedRevenues,
      fetchServiceBasedRevenues,
      emptyTransactions,
    } = this.props;
    const { dateObject } = this.state;
    if (!(isEqual(dateObject, nextProps.dateObj))) {
      emptyTransactions();
      fetchTotalRevenues(nextProps.dateObj);
      fetchServiceBasedRevenues(nextProps.dateObj);
      fetchChannelBasedRevenues(nextProps.dateObj);
      fetchCityBasedRevenues(nextProps.dateObj);
      this.setState({ dateObject: nextProps.dateObj });
    }
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
      : (
        <div className="chartsContainer clearFix">
          <Date />
          <div className="displayRevenueContainer clearFix">
            { renderDisplayRevenues }
          </div>
          <div className="items clearFix">
            <HorizontalBarChart />
            <DonutChart />
            <PieChart />
          </div>
          <div className="items clearFix">
            <VerticalBarChart />
            <TreeMap />
          </div>
          <div className="items clearFix">
            <GroupBarChart />
            <LineChart />
          </div>
        </div>
      );
    return (
      <div className="dashBoardContainer">
        { renderComponent }
      </div>
    );
  }
}

DashBoard.defaultProps = {
  totalRevenues: {},
  dateObj: {},
};

const mapStateToProps = state => ({
  totalRevenues: state.revenues.totalRevenues,
  showLoader: state.revenues.showLoader,
  dateObj: state.revenues.dateObj,
});
const mapDispatchToProps = dispatch => ({
  fetchTotalRevenues: dateObj => dispatch(getTotalRevenues(dateObj)),
  fetchServiceBasedRevenues: dateObj => dispatch(getServiceBasedRevenues(dateObj)),
  fetchChannelBasedRevenues: dateObj => dispatch(getChannelBasedRevenues(dateObj)),
  fetchCityBasedRevenues: dateObj => dispatch(getCityBasedRevenues(dateObj)),
  emptyTransactions: () => dispatch(clearTransactions()),
});

DashBoard.propTypes = {
  totalRevenues: PropTypes.object,
  fetchTotalRevenues: PropTypes.func.isRequired,
  fetchServiceBasedRevenues: PropTypes.func.isRequired,
  fetchChannelBasedRevenues: PropTypes.func.isRequired,
  fetchCityBasedRevenues: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
  dateObj: PropTypes.object,
  emptyTransactions: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
