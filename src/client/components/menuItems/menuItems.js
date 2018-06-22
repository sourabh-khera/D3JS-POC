import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const displayMenuItems = ({
  title, icon, handleClick, toggle, showLeftIcon,
}) =>
  (
    <div className={toggle ? 'changedBackgroundItemParent' : 'menuItemsParentContainer'} onClick={handleClick}>
      <div className="menuItemContainer">
        <span className={`glyphicon ${icon} commonIcons`} />
        <span className="menuItemsFont">{title}</span>
      </div>
      {
        showLeftIcon && !toggle ?
          <div className="menuLeftIconContainer">
            <span className="glyphicon glyphicon-menu-left commonIcons" />
          </div>
          : null
      }
      {
        toggle ?
          <div className="menuLeftIconContainer">
            <span className="glyphicon glyphicon-menu-down commonIcons" />
          </div>
          : null
      }
    </div>
  );

displayMenuItems.defaultProps = {
  handleClick: () => {},
  toggle: false,
  showLeftIcon: true,
};
displayMenuItems.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  toggle: PropTypes.bool,
  showLeftIcon: PropTypes.bool,
};
export default displayMenuItems;