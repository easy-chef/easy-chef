import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VendorIngredientsCollection. It encapsulates state and variable values for recipes.
 */
class VendorIngredientsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorIngredientCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      vendor: String,
      price: Number,
      quantity: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the VendorsIngredientsCollection.
 * @type {VendorIngredientsCollection}
 */
export const VendorIngredients = new VendorIngredientsCollection();
