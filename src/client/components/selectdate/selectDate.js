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
  }
  handleFromChange = date => {
    this.setState({ startDate: date });
    const fromDate = date.format('YYYY-MM-DD');
  }
  handleToChange = date => {
    this.setState({ endDate: date });
    const toDate = date.format('YYYY-MM-DD');
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
const mapDispatchToProps = dispatch => ({
  getDateObject: dateObj => dispatch(saveDateObj(dateObj)),
});

export default connect(null, mapDispatchToProps)(Date);
