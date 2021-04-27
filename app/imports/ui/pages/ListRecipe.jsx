import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';
import Recipe from '../components/Recipe';

/** Renders a table containing all of the Recipe documents. Use <Recipe> to render each row. */
class ListRecipe extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting recipe</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Recipes</Header>
        <Card.Group>
          {this.props.recipes.map((recipe, index) => <Recipe key={index} recipe={recipe}/>)}
        </Card.Group>
      </Container>
    );
  }
}
// Require an array of Recipe documents in the props.
ListRecipe.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const recipes = Recipes.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(ListRecipe);
