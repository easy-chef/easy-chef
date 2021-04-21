import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';
import { Vendors } from '../../api/vendor/Vendors';
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

// Initialize the database with a default data document.
function addProfile(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}

// Initialize the database with a default data document.
function addVendor(vendor) {
  console.log(`  Adding: ${vendor.name} (${vendor.owner})`);
  Vendors.collection.insert(vendor);
}

// Initialize the VendorsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default Vendors.');
    Meteor.settings.defaultVendors.map(vendor => addVendor(vendor));
  }
}
