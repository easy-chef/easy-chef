import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RecipeCollection. It encapsulates state and variable values for recipes.
 */
class RecipesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RecipesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      recipeName: String,
      recipeAuthor: String,
      recipeEmail: String,
      description: String,
      image: String,
      averageRating: Number,
      servings: Number,
      total: Number,
      owner: String,
      restrictions: Array,
      'restrictions.$': {
        type: String,
        allowedValues: ['gluten-free', 'lactose intolerance', 'vegetarian', 'no peanuts', 'none'],
      },
      ingredients: Array,
      'ingredients.$': String,
      tools: Array,
      'tools.$': String,
      steps: Array,
      'steps.$': String,
      userRatings: Array,
      'userRatings.$': Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RecipesCollection.
 * @type {RecipesCollection}
 */
export const Recipes = new RecipesCollection();
