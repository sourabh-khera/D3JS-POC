import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const displayRevenue = ({
  title,
  amount,
  containerBgColor,
  graphIcon,
}) =>
  (
    <div className="revenuesParent">
      <div className="col-sm-3  revenuesContainer" style={containerBgColor} >
        <div className="col-xs-3">
          <span className={`glyphicon ${graphIcon} statsIcon`} />
        </div>
        <div className="col-xs-9">
          <div className="title">Gross Revenue</div>
          <div className="amount">$10,00,000</div>
        </div>
      </div>
    </div>
  );

displayRevenue.defaultProps = {
  containerBgColor: { 'background-color': '#fff' },
};
displayRevenue.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.object.isRequired,
  containerBgColor: PropTypes.object,
  graphIcon: PropTypes.string.isRequired,
};
export default displayRevenue;
