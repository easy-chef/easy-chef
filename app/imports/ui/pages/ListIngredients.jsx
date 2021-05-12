import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';
import Ingredients from '../components/Ingredients';

/** Renders a table containing all of the Ingredients documents. */
class ListIngredients extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="view-ingredient">
        <Header as="h2" textAlign="center">List Ingredients</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ingredient</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.vendoringredients.map((vendoringredient) => <Ingredients key={vendoringredient._id} vendoringredient={vendoringredient} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Ingredients documents in the props.
ListIngredients.propTypes = {
  vendoringredients: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Ingredients documents.
  const subscription = Meteor.subscribe(VendorIngredients.vendorPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Ingredients documents
  const vendoringredients = VendorIngredients.collection.find({}).fetch();
  return {
    vendoringredients,
    ready,
  };
})(ListIngredients);
