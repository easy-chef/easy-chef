import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';
import { Vendors } from '../../api/vendor/Vendors';
import { Recipes } from '../../api/recipe/Recipes';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';

/* eslint-disable no-console */

//  Adds recipes to Recipes collection.
function addRecipe(data) {
  // if (Meteor.settings.defaultRecipes) {
  console.log(`  Adding: ${data.recipeName} (${data.recipeEmail})`);
  Recipes.collection.insert(data);
  // }
}

// Creates default recipes if Recipes collection is empty.
if (Recipes.collection.find().count() === 0) {
  console.log('Creating default recipes');
  Meteor.settings.defaultRecipes.map(data => addRecipe(data));
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

// Initialize the database with a default data document.
function addIngredient(data) {
  console.log(`  Adding: ${data.ingredient} (${data.owner})`);
  VendorIngredients.collection.insert(data);
}

// Initialize the VendorIngredientsCollection if empty.
if (VendorIngredients.collection.find().count() === 0) {
  if (Meteor.settings.defaultIngredients) {
    console.log('Creating default Ingredients.');
    Meteor.settings.defaultIngredients.map(data => addIngredient(data));
  }
}
