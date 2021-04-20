import { Meteor } from 'meteor/meteor';
import { Recipes } from '../../api/recipe/recipes';
import { Profiles } from '../../api/profile/profiles';

/* eslint-disable no-console */

function updateCreatedRecipe(createdRecipe) {
  Recipes.collection.update({ recipeName: createdRecipe }, { $set: { name: createdRecipe } }, { upsert: true });
}

function addCreatedRecipe(createdRecipe) {
  if (Meteor.settings.defaultRecipes) {
    console.log(`  Adding: ${createdRecipe.recipeName} (${createdRecipe.recipeEmail})`);

  }

}

// Creates a new profile.
function createProfiles(profileName, bio, profileImage, rating, createdRecipes, savedRecipes, profileEmail) {
  console.log(`Creating profile ${profileEmail}`);
  // createUser(profileEmail, role);
  Profiles.collection.insert({ profileName, bio, profileImage, rating, createdRecipes, savedRecipes, profileEmail });
  // Add created recipes.
  createdRecipes.map(recipe => Recipes.collection.insert({ recipeEmail: profileEmail, recipe }));
  // Update recipes in recipes collection.
  createdRecipes.map(recipe => updateCreatedRecipe(recipe));
}

if (Recipes.collection.find().count() === 0) {
  console.log('Creating default recipes');
  Meteor.settings.defaultRecipes.map(recipe => addCreatedRecipe(recipe));

}

// Initialize the Database if there are no users.

if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles && Meteor.settings.defaultRecipes) {
    console.log('Creating default profiles');
    Meteor.settings.defaultProfiles.map(profile => createProfiles(profile));
    console.log('Creating default recipes');
    Meteor.settings.defaultRecipes.map(recipe => addCreatedRecipe(recipe));
  } else {
    console.log('Hey did you break something? Might as well treat us for Raising Canes if you dont do something about it.');
  }
}
