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
      ingredient: String,
      price: String,
      size: String,
      quantity: Number,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.vendorPublicationName = `${this.name}.publication.vendor`;
  }
}

/**
 * The singleton instance of the VendorsIngredientsCollection.
 * @type {VendorIngredientsCollection}
 */
export const VendorIngredients = new VendorIngredientsCollection();
