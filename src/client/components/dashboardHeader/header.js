import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enableDisableSlideMenu } from '../../actions/dashboard';
import './style.css';
import avatar from '../../assets/images/avatar.jpg';


class Header extends Component {
  handleHamburgerCLick = () => {
    const { toggleMenu } = this.props;
    toggleMenu();
  }
  render() {
    return (
      <div className="dashBoardHeaderContainer">
        <div className="row dashBoardHeader">
          <div className="col-xs-12 col-md-6 col-sm-6">
            <ul className="list-inline list-container leftHeader">
              <li className="headerTitle">ATG / DMAP</li>
              <li className="commonLi">
                <span className="glyphicon glyphicon-menu-hamburger" onClick={this.handleHamburgerCLick} />
              </li>
              <li className="commonLi">Settings</li>
              <li className="commonLi">Dashboard</li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-6 col-sm-6 marginRightHeader">
            <ul className="list-inline rightHeader">
              <li className="commonLi"><span className="glyphicon glyphicon-bell menuIcon" /></li>
              <li className="commonLi"><span className="glyphicon glyphicon-option-vertical menuIcon" /></li>
              <li className="commonLi"><img src={avatar} alt="can not load" className="avatar" /></li>
              <li className="commonLi">Sourabh Khera</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(enableDisableSlideMenu()),
});
export default connect(null, mapDispatchToProps)(Header);
