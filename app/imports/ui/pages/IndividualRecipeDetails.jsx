import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import RecipeName from '../components/RecipeName';
import RecipeDetails from '../components/RecipeDetails';

/** Renders a page of an individual recipe and its details.  Use <RecipeName> and <RecipeDetails> to render specific info.  */
class IndividualRecipeDetails extends React.Component {

  recipes = [{
    recipeName: 'Tasty Mac \'n Cheese', recipeAuthor: 'Elliot',
    description: 'A family recipe passed down to generations that is affordable to make! I was able to get the ingredients relatively cheap at The Market near student housing.  ' +
        'Foodland at Ala Moana is also a great alternative to search for ingredients.',
    image: 'https://images.unsplash.com/photo-1543339531-242d0bc29010?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFjYXJvbmklMjBhbmQlMjBjaGVlc2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: '4', total: '15', restrictions: ['gluten-free'],
    ingredients: ['8oz. elbow macaroni', '3 tablespoon butter', '3 tablespoon flour', '1/4 teaspoon salt', 'dash pepper', '1 cup milk', '1 cup shredded cheese'], tools: ['stove', 'saucepan', 'large pot'],
    steps: ['Boil lightly salted water then proceed to cook elbow macaroni until cooked.  Afterwards, proceed to drain.',
      'Melt butter in a saucepan over medium heat, then stir in flour and salt for 5 minutes.  Then pour in milk while stirring until it is smooth and bubbling.  ' +
      'Next, add cheddar cheese and continue to stir until cheese is melted', 'Fold macaroni into cheese sauce until it is coated.', 'Enjoy!'],
  }]

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
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

// To be replaced with recipe documents/related collection

// Require an array of Stuff documents in the props.
IndividualRecipeDetails.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Recipe documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(IndividualRecipeDetails);
