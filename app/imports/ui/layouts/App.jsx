import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListRecipe from '../pages/ListRecipe';
import ListItemsAdmin from '../pages/ListItemsAdmin';
import AddRecipe from '../pages/AddRecipe';
import EditRecipe from '../pages/EditRecipe';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import IndividualRecipe from '../pages/IndividualRecipeDetails';
import ViewProfile from '../pages/ViewProfile';
import EditProfile from '../pages/EditProfile';
import AddProfile from '../pages/AddProfile';
import ListIngredients from '../pages/ListIngredients';
import EditIngredients from '../pages/EditIngredients';
import AddIngredient from '../pages/AddIngredient';
import ViewVendors from '../pages/ViewVendors';
import ViewUsers from '../pages/ViewUsers';
import SearchRecipes from '../components/SearchRecipes';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/inprogress" component={NotFound}/>
            <Route path="/viewvendors" component={ViewVendors}/>
            <Route path="/search" component={SearchRecipes}/>
            <ProtectedRoute path="/list" component={ListRecipe}/>
            <ProtectedRoute path="/add" component={AddRecipe}/>
            <ProtectedRoute path="/recipe/:_id" component={IndividualRecipe}/>
            <ProtectedRoute path="/edit/:_id" component={EditRecipe}/>
            <ProtectedRoute path="/viewprofile" component={ViewProfile}/>
            <ProtectedRoute path="/editprofile" component={EditProfile}/>
            <ProtectedRoute path="/addprofile" component={AddProfile}/>
            <ProtectedRoute path="/viewusers" component={ViewUsers}/>
            <AdminProtectedRoute path="/admin" component={ListItemsAdmin}/>
            <VendorProtectedRoute path="/listingredients" component={ListIngredients}/>
            <VendorProtectedRoute path="/editingredients/:_id" component={EditIngredients}/>
            <VendorProtectedRoute path="/addingredient" component={AddIngredient}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * VendorProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and vendor role before routing to the requested page
 * @param {any} { component: Component, ...rest }
 */
const VendorProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
      return (isLogged && isVendor) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each VendorProtectedRoute.
VendorProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
