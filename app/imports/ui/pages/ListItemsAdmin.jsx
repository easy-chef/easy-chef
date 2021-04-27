import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Stuffs } from '../../api/stuff/Stuff';
import { Recipes } from '../../api/recipe/Recipes';
import ItemAdmin from '../components/ItemAdmin';
// import StuffItemAdmin from '../components/StuffItemAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListItemsAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Items (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Recipe Name</Table.HeaderCell>
              <Table.HeaderCell>Recipe Author</Table.HeaderCell>
              <Table.HeaderCell>Recipe Email</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Servings</Table.HeaderCell>
              <Table.HeaderCell>Restrictions</Table.HeaderCell>
              <Table.HeaderCell>Ingredients</Table.HeaderCell>
              <Table.HeaderCell>Tools</Table.HeaderCell>
              <Table.HeaderCell>Steps</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.items.map((item) => <ItemAdmin key={item._id} item={item} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListItemsAdmin.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const items = Recipes.collection.find({}).fetch();
  return {
    items,
    ready,
  };
})(ListItemsAdmin);
