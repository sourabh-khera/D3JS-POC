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
      fromDate: '',
      toDate: '',
    };
  }
  handleChange = range => {
  //  this.setState({ [e.target.name]: e.target.value });
    console.log("range----", range);
  }
  handleSubmit = () => {
    const { getDateObject } = this.props;
    getDateObject(this.state);
  }
  render() {
    const { fromDate, toDate } = this.state;
    //    const enableOrDisable = fromDate && toDate !== '' ? false : true;
    return (
      <div>
        <DatePicker />
        <div className="to-datepicker">to</div>
        <DatePicker />
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
