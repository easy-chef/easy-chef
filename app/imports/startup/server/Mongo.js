import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipe/Recipes';

/* eslint-disable no-console */

//  Adds recipes to Recipes collection.
function addCreatedRecipe(recipe) {
  if (Meteor.settings.defaultRecipes) {
    console.log(`  Adding: ${recipe.recipeName} (${recipe.recipeEmail})`);
    Recipes.collection.insert(recipe);
  }
}

// Creates default recipes if Recipes collection is empty.
if (Recipes.collection.find().count() === 0) {
  console.log('Creating default recipes');
  Meteor.settings.defaultRecipes.map(recipe => addCreatedRecipe(recipe));
}
