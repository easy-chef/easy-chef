import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  NumField,
  SubmitField,
  TextField,
  ListField,
} from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Recipes } from '../../api/recipe/Recipes';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

/** Renders the Page for editing a single document. */
class EditRecipe extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { recipeName, description, image, servings, total, restrictions, ingredients, tools, steps, recipeEmail, _id } = data;
    Recipes.collection.update(_id, { $set: { recipeName, description, image, servings, total, restrictions, ingredients, tools, steps, recipeEmail } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Recipe updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid id="edit-recipe" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Recipe</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='recipeName'/>
              <TextField name='description'/>
              <TextField name='image'/>
              <NumField name='total' decimal={true}/>
              <NumField name='servings' decimal={true}/>
              <MultiSelectField name='restrictions' showInlineError={true} placeholder={'Restrictions'}/>
              <ListField
                name='ingredients'
                showInlineError={true}
                initialCount={this.props.doc.ingredients.length}
                itemProps={this.props.doc.ingredients}>
              </ListField>
              <ListField
                name='tools'
                showInlineError={true}
                initialCount={this.props.doc.tools.length}
                itemProps={this.props.doc.tools}>
              </ListField>
              <ListField
                name='steps'
                showInlineError={true}
                initialCount={this.props.doc.steps.length}
                itemProps={this.props.doc.steps}>
              </ListField>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='recipeEmail' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditRecipe.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Recipes.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditRecipe);
