import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

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
    this.setState({ startDate: date }, () => {
      if (this.state.startDate !== null) {
        this.fromDate = date.format('YYYY-MM-DD');
        this.props.setValue('fromDate', this.fromDate);
      } else {
        this.props.setValue('fromDate', '');
      }
    });
  }
  handleToChange = date => {
    this.setState({ endDate: date }, () => {
      if (this.state.endDate !== null) {
        this.toDate = date.format('YYYY-MM-DD');
        this.props.setValue('toDate', this.toDate);
      } else {
        this.props.setValue('toDate', '');
      }
    });
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
  setValue: PropTypes.func.isRequired,
};


export default Date;
