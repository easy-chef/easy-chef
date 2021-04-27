import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu color={'green'} style={menuStyle} attached="top" borderless inverted>
        <Menu.Item onClick={this.handleItemClick} as={NavLink} activeClassName="" exact to="/" >
          <Header inverted as='h1'>Easy Chef</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/search" key='search'><Icon name="search"/>Search for Recipes</Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/viewvendors" key='viewvendors'><Icon name="shopping basket"/>View Vendors</Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item key='recipe'>
            <Dropdown id="navbar-current-user" text="Your Recipes" icon={'caret down'}>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/list" key='list'><Icon name='clone outline'/>Recipe List</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/add" key='add'><Icon name='plus square outline'/>Add Recipe</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown></Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
          <Menu.Item key='ingredients'>
            <Dropdown id="navbar-ingredients" text="Ingredients" icon={'caret down'}>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/listingredients" key='listingredients'><Icon name='clone outline'/>View/Edit</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/addingredient" key='addingredient'><Icon name='plus square outline'/>Add</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown></Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user circle'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                <Dropdown.Item id="navbar-view-profile" icon="address card outline" text="View Profile" as={NavLink} exact to="/viewprofile"/>
                <Dropdown.Item id="navbar-edit-profile" icon="edit outline" text="Edit Profile" as={NavLink} exact to="/editprofile"/>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'><Icon name="folder open"/>Admin</Dropdown.Item>) : ''}
                {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
                  <Dropdown.Item as={NavLink} activeClassName="active" exact to="/list" key='list'><Icon name="pencil alternate"/>Edit Vendor Profile</Dropdown.Item>
                ) : ''}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
