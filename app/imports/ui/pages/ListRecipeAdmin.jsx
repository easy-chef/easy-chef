import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';
import RecipeAdmin from '../components/RecipeAdmin';

/** Renders a table containing all of the RecipeAdmin documents. */
class ListRecipeAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">All Recipes</Header>
        <Card.Group>
          {this.props.recipes.map((recipe, index) => <RecipeAdmin key={index} recipe={recipe}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of RecipeAdmin documents in the props.
ListRecipeAdmin.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to RecipeAdmin documents.
  const subscription = Meteor.subscribe(Recipes.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Recipe documents
  const recipes = Recipes.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(ListRecipeAdmin);
