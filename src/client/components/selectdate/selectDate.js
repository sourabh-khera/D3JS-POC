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
      fromDate: null,
      toDate: null,
    };
  }
  handleFromChange = date => {
    this.setState({ fromDate: date });
  }
  handleToChange = date => {
    this.setState({ toDate: date });
  }
  render() {
    const { fromDate, toDate } = this.state;
    return (
      <div className="datepickerContainer">
        <DatePicker
          onChange={this.handleFromChange}
          isClearable
          placeholderText="Start-Date"
          selected={fromDate}
          dateFormat="YYYY-MM-DD"
        />
        <DatePicker
          onChange={this.handleToChange}
          isClearable
          placeholderText="End-Date"
          selected={toDate}
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
