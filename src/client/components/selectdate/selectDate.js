import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { saveDateObj } from '../../actions/revenues';

class Date extends Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
    };
    this.fromDate = '';
    this.toDate = '';
  }
  handleFromChange = date => {
    this.setState({ startDate: date });
    this.fromDate = date.format('YYYY-MM-DD');
  }
  handleToChange = date => {
    this.setState({ endDate: date });
    this.toDate = date.format('YYYY-MM-DD');
  }
  handleSubmit = () => {
    const { getDateObject } = this.props;
    const dateObj = { fromDate: this.fromDate, toDate: this.toDate };
    getDateObject(dateObj);
  }
  render() {
    const { startDate, endDate } = this.state;
    return (
      <div className="datepickerContainer">
        <DatePicker
          onChange={this.handleFromChange}
          isClearable
          placeholderText="Start-Date"
          selected={startDate}
          dateFormat="YYYY-MM-DD"
        />
        <DatePicker
          onChange={this.handleToChange}
          isClearable
          placeholderText="End-Date"
          selected={endDate}
          dateFormat="YYYY-MM-DD"
        />
      </div>


    );
  }
}
Date.propTypes = {
  getDateObject: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  getDateObject: dateObj => dispatch(saveDateObj(dateObj)),
});

export default connect(null, mapDispatchToProps)(Date);
