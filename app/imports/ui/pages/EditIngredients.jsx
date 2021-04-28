import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';

const bridge = new SimpleSchema2Bridge(VendorIngredients.schema);

/** Renders the Page for editing a single document. */
class EditIngredients extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { ingredient, price, size, quantity, _id } = data;
    VendorIngredients.collection.update(_id, { $set: { ingredient, price, size, quantity } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid id='edit-ingredient' container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Ingredient</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField id='edit-ingredient-ingredient' name='ingredient'/>
              <TextField id='edit-ingredient-price' name='price' iconLeft="dollar"/>
              <TextField id='edit-ingredient-size' name='size'/>
              <NumField id='edit-ingredient-quantity' name='quantity' decimal={false}/>
              <SubmitField id='submit' value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditIngredients.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(VendorIngredients.vendorPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = VendorIngredients.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditIngredients);
