import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Recipes } from '../../api/recipe/Recipes';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';
import RecipeName from '../components/RecipeName';
import RecipeDetails from '../components/RecipeDetails';

/** Renders a page of an individual recipe and its details.  Use <RecipeName> and <RecipeDetails> to render specific info.  */
class IndividualRecipeDetails extends React.Component {

  lowestIngredients = (recipeIngredients) => {
    const ingredientList = _.map(recipeIngredients, (ingredient) => _.filter(this.props.ingredients, (vendorIngredient) => vendorIngredient.ingredient === ingredient));
    const lowestPrices = _.map(ingredientList, function (eachIngredient) {
      return _.min(_.pluck(eachIngredient, 'price'));
    });
    return _.reduce(lowestPrices, function (memo, num) { return memo + num; });
  }

  costUpdate = (totalCalculated) => {
    const total = totalCalculated;
    console.log(total);
    Recipes.collection.update(this.props.recipe._id, { $set: { total } });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting recipe</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    this.costUpdate(this.lowestIngredients(this.props.recipe.ingredients));
    return (
      <div id="individual-recipe">
        <RecipeName recipe={this.props.recipe}/>
        <RecipeDetails recipe={this.props.recipe}/>
      </div>
    );
  }
}

// Require an array of Recipe documents in the props.
IndividualRecipeDetails.propTypes = {
  recipe: PropTypes.object,
  ingredients: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const recipeId = match.params._id;
  // Get access to Recipe documents.
  const subscriptionRecipe = Meteor.subscribe(Recipes.userPublicationName);
  const subscriptionIngredients = Meteor.subscribe(VendorIngredients.userPublicationName);
  // Get the Recipe documents
  const recipe = Recipes.collection.findOne(recipeId);
  const ingredients = VendorIngredients.collection.find().fetch();
  return {
    recipe,
    ingredients,
    ready: subscriptionRecipe.ready() && subscriptionIngredients.ready(),
  };
})(IndividualRecipeDetails);
