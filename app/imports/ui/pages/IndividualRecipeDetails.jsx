import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';
import RecipeName from '../components/RecipeName';
import RecipeDetails from '../components/RecipeDetails';
import { ProfileRecipes } from '../../api/profile/ProfileRecipes';

/** Renders a page of an individual recipe and its details.  Use <RecipeName> and <RecipeDetails> to render specific info.  */
class IndividualRecipeDetails extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.readyRecipe) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div>
        {this.recipes.map((recipe, index) => <RecipeName key={index} recipe={recipe}/>)}
        {this.recipes.map((recipe, index) => <RecipeDetails key={index} recipe={recipe}/>)}
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
IndividualRecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired,
  readyRecipe: PropTypes.bool.isRequired,
  readyProfileRecipe: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const recipeId = match.params._id;
  // Get access to Recipe documents.
  const subscriptionRecipe = Meteor.subscribe(Recipes.userPublicationName);
  const subscriptionProfileRecipe = Meteor.subscribe(ProfileRecipes.userPublicationName);
  // Determine if the subscription is ready
  const readyRecipe = subscriptionRecipe.ready();
  const readyProfileRecipe = subscriptionProfileRecipe.ready();
  // Get the Recipe documents
  const recipe = Recipes.collection.findOne(recipeId);
  return {
    recipe,
    readyRecipe,
    readyProfileRecipe,
  };
})(IndividualRecipeDetails);
