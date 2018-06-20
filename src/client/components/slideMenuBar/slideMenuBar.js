import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import avatar from '../../assets/images/avatar.jpg';
import './style.css';

const styles = {
  bmMenu: {
    background: '#3a4148',
    padding: '2.5em 1.5em 0',
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
};

class SlideMenuBar extends Component {
  handleStateChange = state => {
  console.log(state.isOpen);
  }
  render() {
    const { menuOpen } = this.props;
    return (
      <div>
        <Menu
          isOpen={menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          styles={styles}
          width={240}
          noOverlay
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
          <div className="menuItemsParentContainer">
            <div className="menuItemContainer">
              <span className="glyphicon glyphicon-filter commonIcons" />
              <span className="menuItemsFont">Filters</span>
            </div>
            <div className="menuLeftIconContainer">
              <span className="glyphicon glyphicon-menu-left commonIcons" />
            </div>
          </div>
          <div className="menuItemsParentContainer">
            <div className="menuItemContainer">
              <span className="glyphicon glyphicon-list-alt commonIcons" />
              <span className="menuItemsFont">Reports</span>
            </div>
            <div className="menuLeftIconContainer">
              <span className="glyphicon glyphicon-menu-left commonIcons" />
            </div>
          </div>
          <div className="menuItemsParentContainer">
            <div className="menuItemContainer">
              <span className="glyphicon glyphicon-stats commonIcons" />
              <span className="menuItemsFont">Charts</span>
            </div>
            <div className="menuLeftIconContainer">
              <span className="glyphicon glyphicon-menu-left commonIcons" />
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}
SlideMenuBar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  menuOpen: state.dashBoard.menuOpen,
});
export default connect(mapStateToProps)(SlideMenuBar);
