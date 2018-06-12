import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';
import { saveDateObj } from '../../actions/revenues';

class Date extends Component {
  constructor() {
    super();
    this.state = {
      fromDate: '',
      toDate: '',
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = () => {
    const { getDateObject } = this.props;
    getDateObject(this.state);
  }
  render() {
    const { fromDate, toDate } = this.state;
    const enableOrDisable = fromDate && toDate !== '' ? false : true;
    return (
      <div className="selectDate">
        <span className="fromDate">From: </span>
        <input type="date" id="from-Date" onChange={this.handleChange} name="fromDate" />
        <span className="toDate">To: </span>
        <input type="date" id="to-Date" onChange={this.handleChange} name="toDate" />
        <button className="submit" disabled={enableOrDisable} onClick={this.handleSubmit} >
        Submit
        </button>
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
