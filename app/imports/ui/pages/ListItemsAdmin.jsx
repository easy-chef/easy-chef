import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';
import ItemAdmin from '../components/ItemAdmin';
import VendorAdmin from '../components/VendorAdmin';
import IngredientAdmin from '../components/IngredientAdmin';

/** Renders a table containing all of the Recipes, Vendors, Ingredients documents. */
class ListItemsAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Recipes (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Condition</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.items.map((item) => <ItemAdmin key={item._id} item={item} />)}
          </Table.Body>
        </Table>
        <Header as="h2" textAlign="center">List Vendors (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Hours</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.vendors.map((vendor) => <VendorAdmin key={vendor._id} vendor={vendor} />)}
          </Table.Body>
        </Table>
        <Header as="h2" textAlign="center">List Ingredients (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ingredient</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Vendor Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.ingredients.map((ingreditem) => <IngredientAdmin key={ingreditem._id} ingreditem={ingreditem} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of documents in the props.
ListItemsAdmin.propTypes = {
  items: PropTypes.array.isRequired,
  vendors: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to documents.
  const subscription = Meteor.subscribe(Recipes.adminPublicationName);
  const subscription2 = Meteor.subscribe(Vendors.adminPublicationName);
  const subscription3 = Meteor.subscribe(VendorIngredients.adminPublicationName);

  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  // Get the documents
  const items = Recipes.collection.find({}).fetch();
  const vendors = Vendors.collection.find({}).fetch();
  const ingredients = VendorIngredients.collection.find({}).fetch();
  return {
    items,
    vendors,
    ingredients,
    ready,
  };
})(ListItemsAdmin);
