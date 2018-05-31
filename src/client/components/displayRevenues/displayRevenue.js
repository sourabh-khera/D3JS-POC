import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const displayRevenue = ({ title, amount }) =>
  (
    <div className="titleRevenueContainer">
      <h4 className="title">{title}</h4>
      <h1 className="totalRevenue">{amount}</h1>
    </div>
  );

displayRevenue.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};
export default displayRevenue;
