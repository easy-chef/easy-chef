import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/profile/Profile';
import { Recipes } from '../../api/recipe/Recipes';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';
import { VendorProfiles } from '../../api/vendor/VendorProfile';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.collection.find({ recipeEmail: username });
  }
  return this.ready();
});

// Admin/vendor-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find();
  }
  return this.ready();
});

Meteor.publish(VendorIngredients.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return VendorIngredients.collection.find();
  }
  return this.ready();
});

Meteor.publish(VendorProfiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return VendorProfiles.collection.find();
  }
  return this.ready();
});

// Vendor-level publication.
// If logged in and with vendor role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(VendorIngredients.vendorPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return VendorIngredients.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(VendorProfiles.public, function () {
  return VendorProfiles.collection.find({
    userId: { $exists: false },
  });
});

Meteor.publish(Profiles.public, function () {
  return Profiles.collection.find({
    userId: { $exists: false },
  });
});

Meteor.publish(Profiles.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(VendorIngredients.userPublicationName, () => VendorIngredients.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
