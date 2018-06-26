import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import avatar from '../../assets/images/avatar.jpg';
import DisplayMenuItems from '../../components/menuItems/menuItems';
import Date from '../selectdate/selectDate';
import './style.css';
import { saveDateObj } from '../../actions/revenues';

const styles = {
  bmMenu: {
    background: '#3a4148',
    fontSize: '1.15em',
  },

  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmBurgerBars: {
    display: 'none',
  },
  bmBurgerButton: {
    display: 'none',
  },
};
class SlideMenuBar extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      showLeftIcon: true,
      openCalendar: false,
      toggleFilterTypes: false,
      fromDate: '',
      toDate: '',
    };
  }

  setValue = (type, value) => {
    if (type === 'fromDate') {
      this.setState({ fromDate: value });
    } else {
      this.setState({ toDate: value });
    }
  }
  handleMenuClick = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  }
  handleFiltersClick = () => {
    const { openCalendar, toggleFilterTypes } = this.state;
    this.setState({ openCalendar: !openCalendar, toggleFilterTypes: !toggleFilterTypes });
  }

  handleSubmit = () => {
    const { getDateObject } = this.props;
    const { fromDate, toDate } = this.state;
    const dateObj = { fromDate, toDate };
    getDateObject(dateObj);
  }
  render() {
    const { menuOpen } = this.props;
    const { toggle, showLeftIcon, openCalendar, toggleFilterTypes, fromDate, toDate } = this.state;
    const renderCalendar = openCalendar ? <Date setValue={this.setValue} /> : null;
    const disabled = fromDate && toDate !== '' ? null : 'disabled';
    const renderFilterTypes = toggle ?
      (
        <div className="filterTypes">
          <DisplayMenuItems
            title="Date Range"
            icon="glyphicon-calendar"
            handleClick={this.handleFiltersClick}
            toggleFilterTypes={toggleFilterTypes}
          />
          {renderCalendar}
        </div>
      )
      : null;

    return (
      <div>
        <Menu
          isOpen={menuOpen}
      //    onStateChange={state => this.handleStateChange(state)}
          styles={styles}
          width={240}
          noOverlay
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
        >
          <div className="profileContainer">
            <span><img src={avatar} alt="can not load" className="slidePanelProfileImage" /></span>
            <span className="userName">Sourabh Khera</span>
          </div>
          <form>
            <div className="input-group formPadding">
              <input type="text" className="form-control textFieldStyle" placeholder="Search" name="search" />
              <div className="input-group-btn">
                <button className="btn btn-default textFieldStyle" type="submit">
                  <i className="glyphicon glyphicon-search searchIcon" />
                </button>
              </div>
            </div>
          </form>
          <DisplayMenuItems title="Filters" icon="glyphicon-filter" showLeftIcon={showLeftIcon} toggle={toggle} handleClick={this.handleMenuClick} />
          { renderFilterTypes }
          <DisplayMenuItems title="Reports" icon="glyphicon-list-alt" />
          <DisplayMenuItems title="Charts" icon="glyphicon-stats" />
          <button type="button" className={`btn btn-info btn-sm ${disabled} applyButton`} onClick={this.handleSubmit}>Apply Filter</button>
        </Menu>

      </div>
    );
  }
}
SlideMenuBar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  getDateObject: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  menuOpen: state.dashBoard.menuOpen,
});
const mapDispatchToProps = dispatch => ({
  getDateObject: dateObj => dispatch(saveDateObj(dateObj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SlideMenuBar);
