import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipe/recipes';

/* eslint-disable no-console */

function addCreatedRecipe(recipe) {
  if (Meteor.settings.defaultRecipes) {
    console.log(`  Adding: ${recipe.recipeName} (${recipe.recipeEmail})`);
    Recipes.collection.insert(recipe);
  }

}

if (Recipes.collection.find().count() === 0) {
  console.log('Creating default recipes');
  Meteor.settings.defaultRecipes.map(recipe => addCreatedRecipe(recipe));

}
