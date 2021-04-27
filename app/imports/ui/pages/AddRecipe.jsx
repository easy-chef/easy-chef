import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipes';
import MultiSelectField from '../forms/MultiSelectField';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  recipeName: String,
  recipeAuthor: String,
  recipeEmail: String,
  description: String,
  image: String,
  total: Number,
  rating: Number,
  servings: Number,
  restrictions: Array,
  'restrictions.$': {
    type: String,
    allowedValues: ['gluten-free', 'lactose intolerance', 'vegetarian', 'no peanuts'],
    optional: true,
  },
  ingredients: Array,
  'ingredients.$': {
    type: String,
    label: 'ingredients',
    optional: false,
  },
  tools: Array,
  'tools.$': {
    type: String,
    label: 'tools',
    optional: false,
  },
  steps: Array,
  'steps.$': {
    type: String,
    label: 'steps',
    optional: false,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { recipeName, recipeAuthor, recipeEmail, description, image, total, rating, servings, restrictions, ingredients, tools, steps } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert({ recipeName, recipeAuthor, recipeEmail, description, image, total, rating, servings, restrictions, ingredients, tools, steps, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Recipes</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='recipeName'/>
                <TextField name='recipeAuthor'/>
              </Form.Group>
              <span>Note: *You must input your account email or it will not show up under your recipe list!*</span>
              <TextField name='recipeEmail'/>
              <LongTextField name='description'/>
              <TextField name='image'/>
              <Form.Group widths={'equal'}>
                <NumField name='total' decimal={false} showInlineError={true} placeholder={'Estimated Cost'}/>
                <NumField name='rating' decimal={false} showInlineError={true} placeholder={'Select Rating'}/>
                <NumField name='servings' decimal={false} showInlineError={true} placeholder={'Select Serving Amount'}/>
              </Form.Group>
              <MultiSelectField name='restrictions' showInlineError={true} placeholder={'Select restrictions (optional)'}/>
              <LongTextField name='ingredients'/>
              <LongTextField name='tools'/>
              <LongTextField name='steps'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddRecipe;
