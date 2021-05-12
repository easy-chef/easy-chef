import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Divider, Grid, Header, Icon, Image, Item, List, Loader, Rating } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { Recipes } from '../../api/recipe/Recipes';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';

/** Renders a page of an individual recipe and its details.  Use <RecipeName> and <RecipeDetails> to render specific info.  */
class IndividualRecipeDetails extends React.Component {
  ratingState = {};

  lowestIngredients = (recipeIngredients) => {
    const ingredientList = _.map(recipeIngredients, (ingredient) => _.filter(this.props.ingredients, (vendorIngredient) => ingredient.includes(vendorIngredient.ingredient)));
    const lowestIngredientPrices = _.map(ingredientList, function (eachIngredient) {
      return _.min(_.pluck(eachIngredient, 'price'));
    });
    const lowestRecipeCost = _.filter(lowestIngredientPrices, (ingredientPrice) => ingredientPrice !== Infinity);
    return _.reduce(lowestRecipeCost, function (memo, num) { return memo + num; }, 0);
  }

  costUpdate = (totalCalculated) => {
    const total = totalCalculated;
    Recipes.collection.update(this.props.recipe._id, { $set: { total } });
  }

  handleRatingRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
    const userRatings = this.props.recipe.userRatings;
    userRatings.push(rating);
    const ratingSum = _.reduce(this.props.recipe.userRatings, function (memo, num) { return memo + num; }, 0);
    const averageRating = ratingSum / this.props.recipe.userRatings.length;
    Recipes.collection.update(this.props.recipe._id, { $set: { averageRating, userRatings } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Thanks for the feedback!', 'success')));
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
        <div className="recipe-background">
          <Grid container columns={2}>
            <Grid.Column>
              <div className="recipe-title">
                <Item>
                  <Item.Content>
                    <Item.Header><Header as='h1' size='huge'>{this.props.recipe.recipeName}</Header></Item.Header>
                    <Item.Meta><Header size='medium'>By {this.props.recipe.recipeAuthor}</Header></Item.Meta>
                    <div className='recipe-description'>
                      <Item.Description>{this.props.recipe.description}</Item.Description>
                    </div>
                  </Item.Content>
                </Item>
                <Card>
                  <Card.Content>
                    <Card.Header>Lowest Estimated Cost <Icon name='dollar sign'/></Card.Header>
                  </Card.Content>
                  <Card.Content>
                    {this.props.recipe.total}
                  </Card.Content>
                  <Card.Content extra> *Cost computed based on price listings of vendors and may not be entirely accurate.*</Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Card.Header>Restrictions <Icon name='food'/></Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <List items={this.props.recipe.restrictions}/>
                  </Card.Content>
                </Card>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Image alt="sample" src={this.props.recipe.image} size='medium' centered/>
                <Card.Content>
                  <Card.Header className="rating-display">Average User Rating <Icon name='star'/></Card.Header>
                  <Rating icon='star' defaultRating={this.props.recipe.averageRating} maxRating={5} disabled/>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </div>
        <div className="recipe-details">
          <Grid container row={3}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Card fluid color='black'>
                  <Card.Content>
                    <Card.Header><Icon name='shopping basket'/>Ingredients</Card.Header>
                    <Card.Description>
                      <List bulleted items={this.props.recipe.ingredients}/>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Item as={NavLink} exact to="/inprogress"><Icon name='map'/>Locate ingredients</Item>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card fluid color='black'>
                  <Card.Content>
                    <Card.Header><Icon name='utensil spoon'/>Tools</Card.Header>
                    <Card.Description>
                      <List bulleted items={this.props.recipe.tools}/>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Card fluid color='black'>
                  <Card.Content>
                    <Card.Header><Icon name='pencil alternate'/>Steps</Card.Header>
                    <Card.Description>
                      <List ordered items={this.props.recipe.steps}/>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Card fluid color='black'>
                  <Card.Content>
                    <Card.Header><Icon name='star'/>Rating</Card.Header>
                    <Card.Meta>Had a change to try out the recipe? Leave a rating below!</Card.Meta>
                    <Rating icon='star' maxRating={5} size='massive' className='rating-submit' onRate={this.handleRatingRate}/>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
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
